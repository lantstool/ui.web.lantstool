export const getTransaction = (rpc, params) => {
  return rpc.getTransaction({
    transactionHash: params.transactionHash.trim(),
    signerId: params.signerId.value,
    waitUntil: params.waitUntil.value,
  });
};
