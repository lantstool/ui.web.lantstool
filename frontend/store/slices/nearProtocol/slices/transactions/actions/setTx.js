import { action } from '../../../../../../../react-vault/index.js';

export const setTx = action(({ slice, payload }) => {
  slice.transaction = payload;
});
