import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .min(1, "Min 1 character")
    .max(30, "Max characters 30"),
});