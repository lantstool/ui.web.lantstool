import { object, string } from 'yup';

export const deleteAccountSchema = object({
  type: string().required(),
  beneficiaryId: string().defined(),
});
