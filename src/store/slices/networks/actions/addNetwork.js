import { action } from '../../../../react-vault';

export const addNetwork = action(({ slice, payload }) => {
  slice.list.push(payload.networkId);
  slice.map[payload.networkId] = payload;
  slice.current = payload;
});
