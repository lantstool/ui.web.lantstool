// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parseSeedPhrase } from 'near-seed-phrase';
import { asyncDebounce } from '../../../../../../../../store/vault/helpers/asyncDebounce.ts';
import * as yup from 'yup';

const checkPublicKey = (value: any, accessKeyList: any) => {
  try {
    const seedPhrase = parseSeedPhrase(value).publicKey;
    const findEl: any = accessKeyList.find((el: any) => el.public_key === seedPhrase);
    return findEl !== undefined;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const existInVault = (value: any, list: any) => {
  try {
    const pk = parseSeedPhrase(value).publicKey;
    const setOfKeys = new Set(list);
    return !setOfKeys.has(pk);
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const seedPhraseSchema = (accessKeyList: any, ref1: any, ref2: any, list: any) => {
  const debounceCheckPublicKey: any = asyncDebounce(checkPublicKey, ref1);
  const debounceExistInVault: any = asyncDebounce(existInVault, ref2);
  return yup.object({
    seedPhrase: yup
      .string()
      .required('Empty field')
      .test('matches', 'Seed phrase not exist in blockchain', function (value) {
        return debounceCheckPublicKey(value, accessKeyList);
      })
      .test('exist', 'This key already exists in vault', function (value) {
        return debounceExistInVault(value, list);
      }),
  });
};
