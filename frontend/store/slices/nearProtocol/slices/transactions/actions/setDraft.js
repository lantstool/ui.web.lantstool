import { action } from '../../../../../../../react-vault/index.js';

export const setDraft = action(({ slice, payload }) => {
  const { transactionId, draft } = payload;
  slice.drafts[transactionId] = draft;
});
