const rpcCaller = (rpc) => rpc.getNetworkInfo({ responseNameConvention: 'snake_case' });

export const getNetworkInfo = {
  rpcCaller,
};
