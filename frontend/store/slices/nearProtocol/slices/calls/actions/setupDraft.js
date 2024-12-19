import { action } from '@react-vault';

export const setupDraft = action(({ slice, payload: call }) => {
  const { callId, body } = call;

  slice.drafts[callId] = {
    origin: call,
    currentMethod: body.method.value,
    [body.method.value]: body,
  };
});
