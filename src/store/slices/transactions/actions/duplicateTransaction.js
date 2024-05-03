import { action } from '../../../../react-vault';

export const duplicateTransaction = action(({ slice, payload: duplicate }) => {
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  slice.list.splice(duplicate.order, 0, duplicate.transactionId);
  slice.map[duplicate.transactionId] = { ...duplicate, results };
  slice.list.forEach((transactionId, index) => {
    const transaction = slice.map[transactionId];
    transaction.order = index;
  });
});
