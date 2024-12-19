import { action } from '@react-vault';

export const setActiveRpc = action(({ slice, payload }) => {
  slice.network.activeRpc = payload;
});
