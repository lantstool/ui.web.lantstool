import * as yup from 'yup';
import { KeyPair } from 'near-api-js';
import { useStoreEffect } from '@react-vault';

const isValidPublicKey = (value) => {
  try {
    if (KeyPair.fromString(value).getPublicKey().toString()) return true;
  } catch {
    return false;
  }
};

export const createSchema = (spaceId, networkId) => {
  const getPublicKey = useStoreEffect((store) => store.nearProtocol.keys.getPublicKey);
  return yup.object({
    privateKey: yup
      .string()
      .required('Empty field')
      .length(96,'Private key length must be 96 characters.')
      .test('matches', "Can't generate Key Pair from provided private key", isValidPublicKey)
      .test('matches', 'This key already exists', async (value) => {
        try {
          const publicKey = KeyPair.fromString(value).getPublicKey().toString();
          const isPublicKeyExist = await getPublicKey({ spaceId, networkId, publicKey });
          return !isPublicKeyExist;
        } catch (e) {
          return false;
        }
      }),
  });
};
