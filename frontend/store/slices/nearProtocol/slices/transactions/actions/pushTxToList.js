import { action } from '@react-vault';

export const pushTxToList = action(({ slice, payload }) => {
  slice.txList.push(payload);
});
