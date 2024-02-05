import { action } from '../../../../react-vault';

export const initPage = action(({ slice, payload }: any) => {
  payload.transactions.forEach((tx: any) => {
    slice.list.push(tx.transactionId);
    slice.map[tx.transactionId] = tx;
  });
});
