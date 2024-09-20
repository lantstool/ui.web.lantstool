import { action } from '../../../../../react-vault/index.js';

export const addTransaction = action(({ slice, payload }) => {
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  slice.list.push(payload.transactionId);
  slice.map[payload.transactionId] = { ...payload, results };
});
