import { action } from '../../../../react-vault';

export const setCurrentNetwork = action(({ slice, payload: network }: any) => {
  slice.current = network;
});
