import { action } from '../../../react-vault/index.ts';

export const deleteTransaction = action(({ slice, payload: transactionId }: any) => {
  slice.list = slice.list.filter((txId: string) => txId !== transactionId);
  delete slice.map[transactionId];
  slice.active = slice.list[0];
});
