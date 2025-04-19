import * as yup from 'yup';
import { useStoreEffect, useStoreEntity } from '@react-vault';
import { parseSeedPhrase } from 'near-seed-phrase';

const debounceAsync = (func) => {
  const timeouts = new Map();
  return (...args) =>
    new Promise((resolve) => {
      const key = JSON.stringify(args); // creating unique key for troubleshooting clearing non unique timeout
      clearTimeout(timeouts.get(key));

      const timeout = setTimeout(async () => {
        timeouts.delete(key);
        resolve(await func(...args));
      }, 200);

      timeouts.set(key, timeout);
    });
};

const getKey = debounceAsync(async (value, dPath) => {
  try {
    return parseSeedPhrase(value, dPath).publicKey;
  } catch (e) {
    return false;
  }
});

export const createSeedPhraseSchema = (spaceId, networkId, signerId) => {
  const getPublicKey = useStoreEffect((store) => store.nearProtocol.keys.getPublicKey);
  const rpc = useStoreEntity((store) => store.nearProtocol.rpcProvider);

  return yup.object({
    seedPhrase: yup
      .string()
      .required('Empty field')
      .min(1)
      .max(208)
      .test(
        'match',
        'This key not exists or has not Full Access permission',
        async (value, values) => {
          try {
            const dPath = values.from[0].value.derivationPath;

            const publicKey = await getKey(value, dPath, 'firstTest');
            if (!publicKey) return false;

            await rpc.configure({ spaceId, networkId });
            const accessKey = await rpc.getAccountKey({ accountId: signerId, publicKey });

            if (accessKey.permission !== 'FullAccess') return false;
            return !accessKey.error;
          } catch (e) {
            return false;
          }
        },
      )
      .test('verified', 'This key already exists', async (value, values) => {
        try {
          const dPath = values.from[0].value.derivationPath;
          const publicKey = await getKey(value, dPath, 'secondTest');
          if (!publicKey) return true;
          const key = await getPublicKey({ spaceId, networkId, publicKey });
          return !key;
        } catch (e) {
          return false;
        }
      }),
    derivationPath: yup
      .string()
      .required('Empty field')
      .test('verified', 'Invalid derivation path', (value, values) => {
        const seedPhrase = values.from[0].value.seedPhrase;
        try {
          return parseSeedPhrase(seedPhrase, value);
        } catch (e) {
          return false;
        }
      }),
  });
};
