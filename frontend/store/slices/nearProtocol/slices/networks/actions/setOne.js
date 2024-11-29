import { action } from '@react-vault';

export const setOne = action(({ slice, payload: network }) => {
  slice.network = network;
});
