import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

// https://docs.near.org/api/rpc/transactions#transaction-status-with-receipts

export const getDetailedTransaction =
  (provider) =>
  async ({ transactionHash, signerId, waitUntil, convertToCamelCase }) => {
    const response = await provider.txStatusReceipts(transactionHash, signerId, waitUntil);
    return convertToCamelCase ? toCamelCase(response) : response;
  };
