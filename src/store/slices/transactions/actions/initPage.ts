import { action } from '../../../../react-vault';

export const initPage = action(({ slice, payload }: any) => {
  const list = [];
  const map: any = {};
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  payload.transactions.forEach((tx: any) => {
    list.push(tx.transactionId);
    map[tx.transactionId] = { ...tx, results };
  });

  slice.list = list;
  slice.map = map;
});
