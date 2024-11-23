// https://docs.near.org/api/rpc/transactions#receipt-by-id

export async function getReceipt({ receiptId, responseNameConvention = 'camelCase' }) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_receipt',
      params: {
        receipt_id: receiptId,
      },
    },
    responseNameConvention,
  });
}
