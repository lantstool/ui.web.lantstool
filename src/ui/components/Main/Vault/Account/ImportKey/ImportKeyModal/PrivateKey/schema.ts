import * as yup from 'yup';
import { KeyPair } from 'near-api-js';

const searchInAccessList = (value: any, keyList: any) => {
  try {
    const publicKey = KeyPair.fromString(value).getPublicKey().toString();
    return !keyList.find((el: any) => el.public_key === publicKey).p;
  } catch {
    return false;
  }
};

const searchInVault = (value: any, list: any) => {
  try {
    const publicKey = KeyPair.fromString(value).getPublicKey().toString();
    return !list.find((el: any) => el === publicKey);
  } catch {
    return false;
  }
};

export const createSchema = (list: any, keyList: any) => {
  return yup.object({
    privateKey: yup
      .string()
      .required('Empty field')
      .test('matches', 'Private key not matches the public key', function (value) {
        return searchInAccessList(value, keyList);
      })
      .test('exist', 'This key already exists in vault', function (value: any) {
        return searchInVault(value, list);
      }),
  });
};