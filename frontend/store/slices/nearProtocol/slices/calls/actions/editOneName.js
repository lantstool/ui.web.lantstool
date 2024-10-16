import { action } from '../../../../../../../react-vault/index.js';

export const editOneName = action(({ slice, payload }) => {
  const { transactionId, name } = payload;
  slice.transaction.name = name;
  slice.txMap[transactionId].name = name;
});
