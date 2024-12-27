import { object } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  contractId: schemes.accountIdDropdown('Contract ID'),
  blockId: schemes.targetBlockId,
});
