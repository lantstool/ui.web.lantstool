import { action } from '@react-vault';

export const setResult = action(({ slice, payload }) => {
  slice.results[payload.transactionId] = {
    ...slice.results[payload.transactionId],
    ...payload,
  };
});
