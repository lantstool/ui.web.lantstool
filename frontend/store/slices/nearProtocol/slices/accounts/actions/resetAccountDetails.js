import { action } from '@react-vault';

export const resetAccountDetails = action(({ slice }) => {
  slice.account.details = {};
});
