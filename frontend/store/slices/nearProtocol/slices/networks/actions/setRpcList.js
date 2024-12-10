import { action } from '@react-vault';

export const setRpcList = action(({ slice, payload }) => {
  slice.network.rpcList = payload;
});
