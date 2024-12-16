export const getDetailedTransaction = (rpc, params) =>
  rpc.getDetailedTransaction({
    transactionHash: params.transactionHash,
    signerId: params.signerId.value,
    waitUntil: params.waitUntil.value,
    responseNameConvention: 'snake_case',
  });
