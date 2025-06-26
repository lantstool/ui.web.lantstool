import { action } from '@react-vault';

export const setFunctions = action(({ slice, payload }) => {
  const { codeHash, functions } = payload;

  slice.records[codeHash] = functions;
});
