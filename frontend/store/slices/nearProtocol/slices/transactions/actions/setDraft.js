import { action } from '@react-vault';

export const setDraft = action(({ slice, payload }) => {
  const { transactionId, draft } = payload;
  slice.drafts[transactionId].body = draft;
});
