import { action } from '@react-vault';

export const setDraft = action(({ slice, payload }) => {
  const { callId, draft } = payload;
  slice.drafts[callId] = draft;
});
