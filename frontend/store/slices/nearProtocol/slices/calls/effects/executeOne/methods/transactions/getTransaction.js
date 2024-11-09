export const getTransaction = (rpc, params) => {
  return rpc.getTransaction({
    transactionHash: params.transactionHash,
    signerId: params.signerId.value,
    waitUntil: params.waitUntil.value,
  });
};
