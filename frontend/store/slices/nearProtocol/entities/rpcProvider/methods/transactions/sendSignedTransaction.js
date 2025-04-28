import { toBase64 } from '../../../../../../helpers/toBase64.js';
import { transactions } from 'near-api-js';

// https://docs.near.org/api/rpc/transactions#send-tx

export async function sendSignedTransaction({
  signedTransaction,
  waitUntil = 'EXECUTED_OPTIMISTIC',
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'send_tx',
      params: {
        signed_tx_base64: toBase64(transactions.encodeTransaction(signedTransaction)),
        wait_until: waitUntil,
      },
    },
    responseNameConvention,
  });
}
