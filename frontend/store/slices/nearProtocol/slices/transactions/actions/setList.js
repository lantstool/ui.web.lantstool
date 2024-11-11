import { action } from '@react-vault';

export const setList = action(({ slice, payload }) => {
  slice.txList = [];
  slice.txMap = {};

  payload.forEach((tx) => {
    slice.txList.push(tx.transactionId);
    slice.txMap[tx.transactionId] = tx;
  });
});
