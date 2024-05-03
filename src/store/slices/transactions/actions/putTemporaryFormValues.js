import { action } from '../../../../react-vault';

export const putTemporaryFormValues = action(({ slice, payload }) => {
  const { transactionId, values } = payload;
  slice.temporaryFormValues[transactionId] = values;
});
