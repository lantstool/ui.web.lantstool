const rpcCaller = (rpc, params) => {
  const blockId = params.blockTarget === 'latest' ? null : params.blockId;
  return rpc.getGasPrice({ blockId, responseNameConvention: 'snake_case' });
};

export const getGasPrice = {
  rpcCaller,
};
