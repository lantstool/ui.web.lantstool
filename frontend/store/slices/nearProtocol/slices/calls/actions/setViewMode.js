import { action } from '@react-vault';

export const setViewMode = action(({ slice, payload }) => {
  const { callId, viewMode } = payload;

  slice.results[callId].viewMode = viewMode;
});
