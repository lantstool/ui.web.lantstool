const rpcCaller = (rpc) => rpc.getNodeStatus({ responseNameConvention: 'snake_case' });

export const getNodeStatus = {
  rpcCaller,
};
