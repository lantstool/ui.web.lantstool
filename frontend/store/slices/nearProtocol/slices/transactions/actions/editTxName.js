import { action } from '@react-vault';

export const editTxName = action(({ slice, payload }) => {
  const { transactionId, name } = payload;

  const transaction = slice.txList.find((tx) => tx.transactionId === transactionId);
  transaction.name = name;

  if (slice.drafts[transactionId]) slice.drafts[transactionId].origin.name = name;
});
