import * as yup from 'yup';
import { KeyPair } from 'near-api-js';

const isValidPublicKey = (value: any) => {
  try {
    return KeyPair.fromString(value).getPublicKey().toString();
  } catch {
    return false;
  }
};

export const createSchema: any = (records: any) => {
  const list = Object.values(records);
  return yup.object({
    privateKey: yup
      .string()
      .required('Empty field')
      .test('matches', "Can't generate Key Pair from provided private key", (value): any => {
        return isValidPublicKey(value);
      })
      .test('matches', 'This key already exists', (value): any => {
        return !list.find((el: any) => el.privateKey === value);
      }),
  });
};
