import { action } from '../../../../react-vault/index.js';

export const putTemporaryFormValues = action(({ slice, payload }) => {
  const { transactionId, values } = payload;
  slice.temporaryFormValues[transactionId] = values;
});
