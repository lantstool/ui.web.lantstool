import * as yup from 'yup';


export const createSchema = (publicKey) => {
  return yup.object({
    publicKey: yup
      .string()
      .test('matches', 'The entered key does not match the access key', (value) => {
        return value === publicKey;
      }),
  });
};