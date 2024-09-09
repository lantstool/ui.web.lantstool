import { action } from '../../../../react-vault';

export const removeAccount = action(({ slice, payload }) => {
  slice.ids = slice.ids.filter((accountId) => accountId !== payload);
  delete slice.records[payload];
});