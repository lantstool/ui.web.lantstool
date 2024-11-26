import * as yup from 'yup';

export const createSchema = (name) => {
  return yup.object({
    name: yup
      .string()
      .test('matches', 'The entered name does not match the space name', (value) => {
        return value === name;
      }),
  });
};
