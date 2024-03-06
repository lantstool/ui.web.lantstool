import { action } from '../../../../react-vault';

export const putTemporaryFormValues = action(({ slice, payload }: any) => {
  const { callId, values } = payload;
  slice.temporaryFormValues[callId] = values;
});
