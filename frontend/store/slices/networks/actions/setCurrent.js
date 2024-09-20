import { action } from '../../../../../react-vault/index.js';

export const setCurrent = action(({ slice, payload }) => {
  const { networkId } = payload;
  slice.current = slice.map[networkId];
});
