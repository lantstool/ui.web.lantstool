import { object } from 'yup';
import { accountIdDropdown } from '../../../../_general/validations/accountId.js';

export const deleteAccountSchema = object({
  beneficiaryId: accountIdDropdown('beneficiaryId'),
});
