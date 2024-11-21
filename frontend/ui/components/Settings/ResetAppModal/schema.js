import * as yup from 'yup';

export const schema = yup.object({
  reset: yup
    .string()
    .test('match', 'Enter the word RESET to proceed, noting the character case.', (value) => {
      return value === 'RESET';
    }),
});
