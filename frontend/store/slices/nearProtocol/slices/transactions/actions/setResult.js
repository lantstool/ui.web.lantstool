import { action } from '@react-vault';

// `viewState` is always normalized to { scrollTop, foldedRanges }.
// A new request (isLoading: true) implicitly resets viewState, so effects
// don't need to mention it. Otherwise viewState is deep-merged with the patch.
export const setResult = action(({ slice, payload }) => {
  const { transactionId, isLoading, viewState } = payload;
  const existing = slice.results[transactionId];

  slice.results[transactionId] = {
    ...existing,
    ...payload,
    viewState: isLoading
      ? { scrollTop: 0, foldedRanges: [] }
      : { ...existing?.viewState, ...viewState },
  };
});
