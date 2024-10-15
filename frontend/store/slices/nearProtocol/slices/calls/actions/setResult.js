import { action } from '../../../../../../../react-vault/index.js';

export const setResult = action(({ slice, payload }) => {
  slice.results[payload.transactionId] = {
    ...slice.results[payload.transactionId],
    ...payload,
  };
});
