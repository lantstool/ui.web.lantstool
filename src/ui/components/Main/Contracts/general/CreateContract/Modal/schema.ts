import * as yup from 'yup';

export const createSchema = (contracts: any) =>
  yup.object().shape({
    name: yup
      .string()
      .min(1, 'Length 1 symbols')
      .max(120, 'Length 120 symbols')
      .test('matches', 'This contract name already exists', (value): any => {
        return !Object.values(contracts).some((el: any) => el.name === value);
      }),
  });
