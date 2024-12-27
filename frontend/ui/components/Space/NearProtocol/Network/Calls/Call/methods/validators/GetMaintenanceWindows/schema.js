import { object } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  validatorId: schemes.accountIdDropdown('Validator ID'),
});
