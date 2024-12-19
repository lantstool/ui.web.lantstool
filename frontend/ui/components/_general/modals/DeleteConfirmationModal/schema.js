import * as yup from 'yup';

export const createSchema = (confirmationValue) =>
  yup.object({
    confirmation: yup
      .string()
      .test(
        'match',
        `Enter the '${confirmationValue}' to proceed, noting the character case`,
        (value) => {
          return value === confirmationValue;
        },
      ),
  });
