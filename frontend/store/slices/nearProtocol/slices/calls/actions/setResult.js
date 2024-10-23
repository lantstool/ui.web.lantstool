import { action } from '@react-vault';

export const setResult = action(({ slice, payload }) => {
  slice.results[payload.callId] = {
    ...slice.results[payload.callId],
    ...payload,
  };
});
