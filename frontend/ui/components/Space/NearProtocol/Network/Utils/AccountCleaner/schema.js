import { object } from 'yup';
import { schemes } from '../../_general/validations/schemes.js';

export const schema = object({
  signerId: schemes.accountIdDropdown('signerId'),
  // TODO pass the 'signerKey' for validation error instead of the default publicKey
  signerKey: schemes.publicKeyDropdown,
  beneficiaryId: object().when('mode', {
    is: 'deleteAccount',
    then: () => schemes.accountIdDropdown('beneficiaryId'),
    otherwise: () => object().notRequired().strip(),
  }),
});
