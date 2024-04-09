import { action } from '../../../../react-vault';

export const addTransaction = action(({ slice, payload }: any) => {
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  slice.list.push(payload.transactionId);
  slice.map[payload.transactionId] = { ...payload, results };
});
