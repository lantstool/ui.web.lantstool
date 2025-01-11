import { object } from 'yup';
import { publicKeyDropdown } from '../../../../_general/validations/publicKey.js';

export const deleteKeySchema = object({
  publicKey: publicKeyDropdown,
});
