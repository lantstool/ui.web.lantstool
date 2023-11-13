import { action } from '../../../react-vault';
import { initState } from '../initState.js';

export const initPage = action(({ slice, payload }: any) => {
  const list = [...initState.list];
  const map: any = { ...initState.map };

  payload.transactions.forEach((tx: any) => {
    list.push(tx.transactionId);
    map[tx.transactionId] = tx;
  });

  slice.active = payload.transactions[0].transactionId;
  slice.list = list;
  slice.map = map;
});
