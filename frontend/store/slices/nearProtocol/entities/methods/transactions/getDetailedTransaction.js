// https://docs.near.org/api/rpc/transactions#transaction-status-with-receipts

export async function getDetailedTransaction({
  transactionHash,
  signerId,
  waitUntil = 'FINAL',
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_tx_status',
      params: {
        tx_hash: transactionHash,
        sender_account_id: signerId,
        wait_until: waitUntil,
      },
    },
    responseNameConvention,
  });
}
