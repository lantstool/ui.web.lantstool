const rpcCaller = (rpc, params) =>
  rpc.getTransaction({
    transactionHash: params.transactionHash,
    signerId: params.signerId.value,
    waitUntil: params.waitUntil.value,
    responseNameConvention: 'snake_case',
  });

export const getTransaction = {
  rpcCaller,
};
