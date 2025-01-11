import { object, string } from 'yup';

export const deleteAccountSchema = object({
  beneficiaryId: string().defined(),
});
