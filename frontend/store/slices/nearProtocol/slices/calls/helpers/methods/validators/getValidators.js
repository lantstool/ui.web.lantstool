const rpcCaller = (rpc, params) =>
  rpc.getValidators({
    epochId: params.epochTarget === 'latest' ? null : params.epochId,
    responseNameConvention: 'snake_case',
  });

export const getValidators = {
  rpcCaller,
};
