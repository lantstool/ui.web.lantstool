import { action } from '../../../../react-vault/index.js';

export const setOpenResult = action(({ slice, payload }) => {
  const { callId, isOpen, isLoading = false } = payload;
  slice.records[callId].results.isOpen = isOpen;
  slice.records[callId].results.isLoading = isLoading;
});
