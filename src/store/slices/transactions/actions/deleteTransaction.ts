import { action } from '../../../../react-vault';

export const deleteTransaction = action(({ slice, payload: transactionId }: any) => {
  slice.list = slice.list.filter((txId: string) => txId !== transactionId);
  delete slice.map[transactionId];
});
