import { object, string } from 'yup';

export const schema = object({
  validatorId: object({
    value: string().required(),
  })
    .nullable()
    .required('Validator Id is a mandatory field'),
});
