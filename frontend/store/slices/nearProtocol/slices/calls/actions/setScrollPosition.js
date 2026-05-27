import { action } from '@react-vault';

export const setScrollPosition = action(
  ({ slice, payload }) => (slice.scrollPositions[payload.callId] = payload.scrollPosition),
);
