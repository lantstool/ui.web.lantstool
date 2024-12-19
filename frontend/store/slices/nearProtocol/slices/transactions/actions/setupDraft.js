import { action } from '@react-vault';

export const setupDraft = action(({ slice, payload: transaction }) => {
  const { transactionId, body } = transaction;

  slice.drafts[transactionId] = {
    origin: transaction,
    body,
  };
});
