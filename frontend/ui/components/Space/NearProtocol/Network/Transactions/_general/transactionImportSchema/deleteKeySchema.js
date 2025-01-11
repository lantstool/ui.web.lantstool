import { object, string } from 'yup';

export const deleteKeySchema = object({
  type: string().required(),
  publicKey: string().defined(),
});
