import { action } from '@react-vault';

export const setContractHash = action(({ slice, payload }) => {
  slice.contractHash = payload;
});
