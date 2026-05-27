import { action } from '@react-vault';

export const setScrollPosition = action(
  ({ slice, payload }) => (slice.scrollPositions[payload.transactionId] = payload.scrollPosition),
);
