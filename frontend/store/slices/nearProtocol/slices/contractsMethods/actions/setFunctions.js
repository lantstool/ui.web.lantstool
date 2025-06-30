import { action } from '@react-vault';

export const setFunctions = action(({ slice, payload }) => {
  const { codeHash, functions } = payload;
  console.log(codeHash);
  slice.records[codeHash] = functions;
});
