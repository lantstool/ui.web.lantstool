import * as yup from 'yup';
import { KeyPair } from 'near-api-js';
import { useStoreEffect } from '@react-vault';

const isValidPublicKey = (value) => {
  try {
    return KeyPair.fromString(value).getPublicKey().toString();
  } catch {
    return false;
  }
};

export const createSchema = (spaceId, networkId) => {
  const getKey = useStoreEffect((store) => store.nearProtocol.keys.getKey);

  return yup.object({
    privateKey: yup
      .string()
      .required('Empty field')
      .test('matches', "Can't generate Key Pair from provided private key", (value) => {
        return isValidPublicKey(value);
      })
      .test('matches', 'This key already exists', async (value) => {
        const publicKey = isValidPublicKey(value);
        const key = await getKey({ spaceId, networkId, publicKey });
        return !key;
      }),
  });
};
