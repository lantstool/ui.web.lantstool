import { action } from '@react-vault';

export const setResult = action(({ slice, payload }) => {
  const { callId, isLoading, viewState } = payload;
  const existing = slice.results[callId];

  slice.results[callId] = {
    ...existing,
    ...payload,
    viewState: isLoading
      ? { scrollTop: 0, foldedRanges: [] }
      : { ...existing?.viewState, ...viewState },
  };
});
