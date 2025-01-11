import { action } from '@react-vault';

export const setGeneratedKey = action(({ slice, payload }) => {
  slice.generatedKey = payload;
});
