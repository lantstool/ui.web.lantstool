import { object, array } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  accountKeyPairs: array().of(
    object({
      accountId: schemes.accountIdDropdown(),
      publicKey: schemes.publicKeyDropdown,
    }),
  ),
  blockId: schemes.targetBlockId,
});
