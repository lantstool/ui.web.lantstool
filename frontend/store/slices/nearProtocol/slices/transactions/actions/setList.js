import { action } from '../../../../../../../react-vault/index.js';

export const setList = action(({ slice, payload }) => {
  const txList = [];
  const txMap = {};

  payload.forEach((tx) => {
    txList.push(tx.transactionId);
    txMap[tx.transactionId] = tx;
  });

  slice.txList = txList;
  slice.txMap = txMap;
});
