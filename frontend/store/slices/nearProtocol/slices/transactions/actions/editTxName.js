import { action } from '@react-vault';

export const editTxName = action(({ slice, payload }) => {
  const { transactionId, name } = payload;

  const call = slice.list.find((c) => c.transactionId === transactionId);
  call.name = name;

  slice.drafts[transactionId].origin.name = name;
});
