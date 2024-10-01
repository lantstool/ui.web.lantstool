import { action } from '../../../../../../../react-vault/index.js';

export const pushTxToList = action(({ slice, payload }) => {
  slice.txList.push(payload.transactionId);
  slice.txMap[payload.transactionId] = payload;
});
