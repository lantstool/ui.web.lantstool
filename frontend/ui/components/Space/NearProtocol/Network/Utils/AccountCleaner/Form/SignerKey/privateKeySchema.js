import * as yup from 'yup';
import { KeyPair } from 'near-api-js';
import { useStoreEffect, useStoreEntity } from '@react-vault';

const isValidPublicKey = (value) => {
  try {
    if (KeyPair.fromString(value).getPublicKey().toString()) return true;
  } catch {
    return false;
  }
};

export const createPrivateKeySchema = (spaceId, networkId, signerId) => {
  const getPublicKey = useStoreEffect((store) => store.nearProtocol.keys.getPublicKey);
  const rpc = useStoreEntity((store) => store.nearProtocol.rpcProvider);

  return yup.object({
    privateKey: yup
      .string()
      .required('Empty field')
      .length(96, 'Private key length must be 96 characters.')
      .test('matches', "Can't generate Key Pair from provided private key", isValidPublicKey)
      .test('matches', 'Key not exist in this account', async (value) => {
        try {
          const publicKey = KeyPair.fromString(value).getPublicKey().toString();

          await rpc.configure({ spaceId, networkId });
          const accessKey = await rpc.getAccountKey({ accountId: signerId, publicKey });

          if (accessKey.permission !== 'FullAccess') return false;
          return !accessKey.error;
        } catch (e) {
          return false;
        }
      })
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
