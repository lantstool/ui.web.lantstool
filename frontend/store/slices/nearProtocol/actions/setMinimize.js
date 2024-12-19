import { action } from '@react-vault';

export const setMinimize = action(({ slice, payload }) => {
  slice.isMinimize = payload;
});
