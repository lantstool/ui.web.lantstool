import { object } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  contractIds: schemes.contractIdsDropdown,
  blockId: schemes.targetBlockId,
});
