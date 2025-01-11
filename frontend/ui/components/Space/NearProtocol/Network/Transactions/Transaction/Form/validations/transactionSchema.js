import { object, string, array, lazy, mixed } from 'yup';
import { accountIdDropdown } from '../../../../_general/validations/accountId.js';

export const transactionSchema = object({
  signerId: accountIdDropdown('signerId'),
  // signerKey: string().defined(),
  receiverId:  accountIdDropdown('receiverId'),
})
