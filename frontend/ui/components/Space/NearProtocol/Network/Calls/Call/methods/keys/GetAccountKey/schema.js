import { object } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  accountId: schemes.accountIdDropdown(),
  publicKey: schemes.publicKeyDropdown,
  blockId: schemes.targetBlockId,
});
