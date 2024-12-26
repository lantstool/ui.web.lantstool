import { object } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  transactionHash: schemes.hash('Transaction Hash'),
  signerId: schemes.accountIdDropdown('Signer ID'),
});
