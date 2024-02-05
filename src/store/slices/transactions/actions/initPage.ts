import { action } from '../../../../react-vault';

export const initPage = action(({ slice, payload }: any) => {
  const list = [];
  const map: any = {};

  payload.transactions.forEach((tx: any) => {
    list.push(tx.transactionId);
    map[tx.transactionId] = tx;
  });

  slice.list = list;
  slice.map = map;
});
