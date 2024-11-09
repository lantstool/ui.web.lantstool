export const getDetailedTransaction = (rpc, params) => {
  return rpc.getDetailedTransaction({
    transactionHash: params.transactionHash.trim(),
    signerId: params.signerId.value,
    waitUntil: params.waitUntil.value,
  });
};
