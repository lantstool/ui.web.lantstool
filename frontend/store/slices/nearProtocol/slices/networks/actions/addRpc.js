import { action } from '@react-vault';

export const addRpc = action(({ slice, payload }) => {
  const { rpc, rpcType } = payload;
  slice.network.rpcList[rpcType].push(rpc);
});
