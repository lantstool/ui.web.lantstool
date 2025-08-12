import { action } from '@react-vault';

export const pushTxToList = action(({ slice, payload }) => {
  const { transactionId, name, parentId, order } = payload;

  slice.txList.push({ transactionId, name, parentId, order });
});
