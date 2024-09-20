import { action } from '../../../../../react-vault/index.js';

export const setOpenResult = action(({ slice, payload }) => {
  const { transactionId, isOpen, isLoading = false } = payload;
  slice.map[transactionId].results.isOpen = isOpen;
  slice.map[transactionId].results.isLoading = isLoading;
});
