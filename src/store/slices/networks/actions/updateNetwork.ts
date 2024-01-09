import { action } from '../../../../react-vault';

export const updateNetwork = action(({ slice, payload }: any) => {
  slice.map[payload.networkId] = payload;
  if (slice.current.networkId === payload.networkId) {
    slice.current = payload;
  }
});
