import { action } from '../../../../../react-vault/index.js';

export const removeNetwork = action(({ slice, payload: networkId }) => {
  slice.list = slice.list.filter((id) => id !== networkId);
  delete slice.map[networkId];

  slice.current = slice.map[slice.list[0]];
});
