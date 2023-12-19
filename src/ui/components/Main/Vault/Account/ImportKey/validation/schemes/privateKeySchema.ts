import * as yup from 'yup';
import { KeyPair } from 'near-api-js';
import { asyncDebounce } from '../../../../../../../../store/vault/helpers/asyncDebounce.ts';

const searchInAccessList = (value: any, accessKeyList: any) => {
  try {
    const publicKey = KeyPair.fromString(value).getPublicKey().toString();
    return !accessKeyList.find((el: any) => el.public_key === publicKey).p;
  } catch (e) {
    return false;
  }
};
const searchInVault = (value: any, list: any) => {
  try {
    const publicKey = KeyPair.fromString(value).getPublicKey().toString();
    return !list.find((el: any) => el === publicKey);
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const privateKeySchema = (list: any, accessKeyList: any, ref1: any, ref2: any) => {
  const debounceAccessList: any = asyncDebounce(searchInAccessList, ref1);
  const debounceVault: any = asyncDebounce(searchInVault, ref2);

  return yup.object({
    privateKey: yup
      .string()
      .required('Empty field')
      .test('matches', 'Private key not matches the public key', function (value) {
        return debounceAccessList(value, accessKeyList);
      })
      .test('exist', 'This key already exists in vault', function (value: any) {
        return debounceVault(value, list);
      }),
  });
};
