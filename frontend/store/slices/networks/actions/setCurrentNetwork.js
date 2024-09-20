import { action } from '../../../../../react-vault/index.js';

export const setCurrentNetwork = action(({ slice, payload: network }) => {
  slice.current = network;
});
