import { action } from '../../../../../react-vault/index.js';

export const updateNetwork = action(({ slice, payload }) => {
  slice.map[payload.networkId] = payload;
  if (slice.current.networkId === payload.networkId) {
    slice.current = payload;
  }
});
