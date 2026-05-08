import * as z from 'zod/mini';
import { useStoreEntity } from '@react-vault';

const prefixRegex = /^[a-z\d]+(?:[-_][a-z\d]+)*$/;

const debounceAsync = (func, delay = 400) => {
  let timeoutId;
  let pendingResolve = null;

  return (...args) =>
    new Promise((resolve) => {
      clearTimeout(timeoutId);
      if (pendingResolve) pendingResolve(true);
      pendingResolve = resolve;

      timeoutId = setTimeout(async () => {
        const currentResolve = pendingResolve;
        pendingResolve = null;
        currentResolve(await func(...args));
      }, delay);
    });
};

const checkAvailability = debounceAsync(async (value, rpc, spaceId, networkId) => {
  try {
    await rpc.configure({ spaceId, networkId });
    await rpc.getAccount({ accountId: `${value}.${import.meta.env.VITE_MASTER_ACCOUNT_ID}` });
    return false;
  } catch {
    return true;
  }
});

export const createSchema = (spaceId, networkId) => {
  const rpc = useStoreEntity((store) => store.nearProtocol.rpcProvider);

  return z.object({
    subAccountId: z.string().check(
      z.trim(),
      z.maxLength(46, {
        message: 'Account ID must be at most 64 characters in total.',
      }),
      z.regex(prefixRegex, {
        message: 'Allowed characters: a-z, 0-9, "-", "_".',
      }),
      z.refine(
        async (value) => {
          if (!value || !prefixRegex.test(value)) return true;
          return await checkAvailability(value, rpc, spaceId, networkId);
        },
        { message: 'This account already exists on testnet.' },
      ),
    ),
  });
};
