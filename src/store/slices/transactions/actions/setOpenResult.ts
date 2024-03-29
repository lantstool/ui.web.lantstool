import { action } from '../../../../react-vault';

export const setOpenResult = action(({ slice, payload }: any) => {
  const { transactionId, isOpen } = payload;
  slice.map[transactionId].isOpen = isOpen;
});

