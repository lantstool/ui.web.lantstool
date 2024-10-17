import * as yup from 'yup';

export const createSchema = (records) => {
  const list = Object.values(records);
  return yup.object({
    accountId: yup
      .string()
      .required('Empty field')
      .max(84)
      .test('matches', 'This account already exists', (value) => {
        return !list.find((el) => el.accountId === value);
      }),
    note: yup.string().max(84),
  });
};
