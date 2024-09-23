import { action } from '../../../../../react-vault/index.js';

export const setAll = action(({ slice, payload }) => {
  slice.list = payload;
});
