// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parseSeedPhrase } from 'near-seed-phrase';
import * as yup from 'yup';

const checkPublicKey = (value: any, accessKeyList: any) => {
  try {
    const seedPhrase = parseSeedPhrase(value).publicKey;
    const findEl: any = accessKeyList.find((el: any) => el.public_key === seedPhrase);
    return findEl !== undefined;
  } catch {
    return false;
  }
};

const existInVault = (value: any, list: any) => {
  try {
    const pk = parseSeedPhrase(value).publicKey;
    const setOfKeys = new Set(list);
    return !setOfKeys.has(pk);
  } catch {
    return false;
  }
};

export const createSchema = (accessKeyList: any, list: any) => {
  return yup.object({
    seedPhrase: yup
      .string()
      .required('Empty field')
      .test('matches', 'Seed phrase not exist in blockchain', function (value) {
        return checkPublicKey(value, accessKeyList);
      })
      .test('exist', 'This key already exists in vault', function (value) {
        return existInVault(value, list);
      }),
  });
};
