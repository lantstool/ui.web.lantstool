import * as yup from 'yup';

export const createSchema = (records: any) => {
  const list = Object.values(records);
  return yup.object({
    accountId: yup
      .string()
      .required('Empty field')
      .max(84)
      .test('matches', 'This account already exists', (value) => {
        return !list.find((el: any) => el.accountId === value);
      }),
    accountName: yup.string().required('Empty field').max(84),
  });
};
