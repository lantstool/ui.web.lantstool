const rpcCaller = (rpc, params) =>
  rpc.getReceipt({
    receiptId: params.receiptId,
    responseNameConvention: 'snake_case',
  });

export const getReceipt = {
  rpcCaller,
};
