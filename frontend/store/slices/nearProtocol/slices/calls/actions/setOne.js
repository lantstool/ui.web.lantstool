import { action } from '@react-vault';

export const setOne = action(({ slice, payload }) => {
  slice.call = payload;
});
