import { action } from '@react-vault';

export const editTxName = action(({ slice, payload }) => {
  const { transactionId, name } = payload;
  slice.transaction.name = name;
  slice.txMap[transactionId].name = name;
});
