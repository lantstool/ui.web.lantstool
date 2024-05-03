import * as yup from 'yup';
import { KeyPair } from 'near-api-js';

const isValidPublicKey = (value) => {
  try {
    return KeyPair.fromString(value).getPublicKey().toString();
  } catch {
    return false;
  }
};

export const createSchema = (records) => {
  const list = Object.values(records);
  return yup.object({
    privateKey: yup
      .string()
      .required('Empty field')
      .test('matches', "Can't generate Key Pair from provided private key", (value) => {
        return isValidPublicKey(value);
      })
      .test('matches', 'This key already exists', (value) => {
        return !list.find((el) => el.privateKey === value);
      }),
  });
};
