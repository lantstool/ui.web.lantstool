import { action } from '../../../../react-vault';

export const putTemporaryFormValues = action(({ slice, payload }: any) => {
  const { transactionId, values } = payload;
  slice.temporaryFormValues[transactionId] = values;
});
