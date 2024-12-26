import { object, string } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  contractIds: schemes.contractIdsDropdown,
  keyPrefix: string(),
  blockId: schemes.targetBlockId,
});
