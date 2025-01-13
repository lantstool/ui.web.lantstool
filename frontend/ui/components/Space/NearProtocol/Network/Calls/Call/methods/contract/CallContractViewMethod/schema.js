import { object, string } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  contractId: schemes.accountIdDropdown('Contract ID'),
  methodName: object({
    value: string().required('Method is required'),
  }).required('Method is required'),
  args: string(),
  blockId: schemes.targetBlockId,
});
