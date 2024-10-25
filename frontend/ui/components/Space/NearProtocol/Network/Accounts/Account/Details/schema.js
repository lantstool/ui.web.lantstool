import * as yup from 'yup';

export const schema = yup.object({
  note: yup.string().max(64),
});
