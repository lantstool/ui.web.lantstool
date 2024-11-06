import { action } from '@react-vault';

export const setDraftCurrentMethod = action(({ slice, payload }) => {
  const { callId, currentMethod } = payload;
  slice.drafts[callId].currentMethod = currentMethod;
});
