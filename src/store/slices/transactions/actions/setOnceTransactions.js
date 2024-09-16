import { action } from '../../../../react-vault/index.js';

export const setOnceTransactions = action(({ slice, payload }) => {
  const list = [];
  const map = {};
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  payload.transactions.forEach((tx) => {
    list.push(tx.transactionId);
    map[tx.transactionId] = { ...tx, results };
  });

  slice.list = list;
  slice.map = map;
  slice.isTransactionsLoadedToState = true;
});
