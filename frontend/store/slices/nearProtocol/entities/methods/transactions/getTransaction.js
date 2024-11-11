// https://docs.near.org/api/rpc/transactions#transaction-status

export async function getTransaction({
  transactionHash,
  signerId,
  waitUntil = 'FINAL',
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'tx',
      params: {
        tx_hash: transactionHash,
        sender_account_id: signerId,
        wait_until: waitUntil,
      },
    },
    responseNameConvention,
  });
}
