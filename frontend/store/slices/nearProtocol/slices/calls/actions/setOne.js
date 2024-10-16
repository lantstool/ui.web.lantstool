import { action } from '../../../../../../../react-vault/index.js';

export const setOne = action(({ slice, payload }) => {
  slice.transaction = payload;
});
