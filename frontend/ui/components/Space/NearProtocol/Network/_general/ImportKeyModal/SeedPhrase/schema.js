import * as yup from 'yup';
import { useStoreEffect } from '@react-vault';
import { parseSeedPhrase } from 'near-seed-phrase';

const debounceAsync = (func) => {
  let timeout;
  return (...args) => {
    return new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        resolve(await func(...args));
      }, 200);
    });
  };
};

const getKey = debounceAsync(async (value, dPath) => {
  try {
    return parseSeedPhrase(value, dPath).publicKey;
  } catch (e) {
    return false;
  }
});

export const createSchema = (spaceId, networkId) => {
  const getPublicKey = useStoreEffect((store) => store.nearProtocol.keys.getPublicKey);

  return yup.object({
    seedPhrase: yup
      .string()
      .required('Empty field')
      .min(1)
      .max(208)
      .test('verified', 'This key already exists', async (value, values) => {
        try {
          const dPath = values.from[0].value.derivationPath;
          const publicKey = await getKey(value, dPath);
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
