import * as yup from 'yup';

export const createSchema = (records: any) => {
  const list = Object.values(records);
  return yup.object({
    seedPhrase: yup
      .string()
      .required('Empty field')
      .test('matches', 'This key already exists', (value, values) => {
        return !list.find(
          (el: any) =>
            el.seedPhrase === value && el.derivationPath === values.from[0].value.derivationPath,
        );
      }),
  });
};
