import { action } from '../../../../react-vault';

export const updateTransaction = action(({ slice, payload }) => {
  slice.map[payload.transactionId] = payload;
});
