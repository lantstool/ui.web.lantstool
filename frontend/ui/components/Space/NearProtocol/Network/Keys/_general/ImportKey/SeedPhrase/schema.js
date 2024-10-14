import * as yup from 'yup';

// TODO: Wrong validation for matches! We have to convert seed to private key and
// only then compare it

export const createSchema = (records) => {
  const list = Object.values(records);
  return yup.object({
    seedPhrase: yup
      .string()
      .required('Empty field')
      .test('matches', 'This key already exists', (value, values) => {
        return !list.find(
          (el) =>
            el.seedPhrase === value && el.derivationPath === values.from[0].value.derivationPath,
        );
      }),
  });
};
