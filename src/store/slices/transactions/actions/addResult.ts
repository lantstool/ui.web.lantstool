import { action } from '../../../../react-vault';

export const addResult = action(({ slice, payload }: any) => {
  const { transactionId, result } = payload;
  slice.map[transactionId].result = result;
  slice.map[transactionId].isOpen = true;
});
