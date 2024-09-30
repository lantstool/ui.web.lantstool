import { action } from '../../../../../../../react-vault/index.js';

export const resetAccountDetails = action(({ slice }) => {
  slice.account.details = {};
});
