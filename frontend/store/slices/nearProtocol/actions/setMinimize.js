import { action } from '../../../../../react-vault/index.js';

export const setMinimize = action(({ slice, payload }) => {
  slice.isMinimize = payload;
});
