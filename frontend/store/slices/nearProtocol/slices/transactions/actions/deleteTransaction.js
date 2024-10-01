import { action } from '../../../../../../../react-vault/index.js';

export const deleteTransaction = action(({ slice, payload }) => {
  const { transactionId, updatedTxsOrder } = payload;
  slice.list = slice.list.filter((txId) => txId !== transactionId);
  delete slice.map[transactionId];

  Object.entries(updatedTxsOrder).forEach(([txId, order]) => {
    slice.map[txId].order = order;
  });
});
