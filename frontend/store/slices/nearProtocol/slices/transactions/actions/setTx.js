import { action } from '@react-vault';

export const setTx = action(({ slice, payload }) => {
  slice.transaction = payload;
});
