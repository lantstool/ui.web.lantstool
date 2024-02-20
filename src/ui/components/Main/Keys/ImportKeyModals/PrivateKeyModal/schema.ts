import * as yup from 'yup';
import { KeyPair } from 'near-api-js';

const secretKeySize = (value: any) => {
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
      .test('matches', 'Bad private key size', function (value): any {
        return secretKeySize(value);
      })
      .test('matches', 'This key already exists', function (value) {
        return !list.find((el: any) => el.privateKey === value);
      }),
  });
};
