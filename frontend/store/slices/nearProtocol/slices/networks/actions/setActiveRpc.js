import { action } from '@react-vault';

export const setActiveRpc = action(({ slice, payload }) => {
  const { rpcType, autoBalance, rpc } = payload;
  slice.network.activeRpc[rpcType].autoBalance = autoBalance;
  slice.network.activeRpc[rpcType].rpc = rpc;
});
