import { action } from '../../../../react-vault/index.js';

export const putTemporaryFormValues = action(({ slice, payload }) => {
  const { callId, values } = payload;
  slice.temporaryFormValues[callId] = values;
});
