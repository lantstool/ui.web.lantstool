export const getReceipt = (rpc, params) =>
  rpc.getReceipt({
    receiptId: params.receiptId,
    responseNameConvention: 'snake_case',
  });
