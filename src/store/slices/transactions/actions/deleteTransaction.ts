import { action } from '../../../../react-vault';

export const deleteTransaction = action(({ slice, payload }: any) => {
  const { transactionId, updatedTxsOrder } = payload;
  slice.list = slice.list.filter((txId: string) => txId !== transactionId);
  delete slice.map[transactionId];

  Object.entries(updatedTxsOrder).forEach(([txId, order]: any) => {
    slice.map[txId].order = order;
  });
});
