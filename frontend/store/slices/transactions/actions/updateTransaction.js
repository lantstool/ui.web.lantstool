import { action } from '../../../../../react-vault/index.js';

export const updateTransaction = action(({ slice, payload }) => {
  slice.map[payload.transactionId] = payload;
});
