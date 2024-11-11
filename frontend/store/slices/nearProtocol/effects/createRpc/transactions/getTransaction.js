import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

// https://docs.near.org/api/rpc/transactions#transaction-status

export const getTransaction =
  (provider) =>
  async ({ transactionHash, signerId, waitUntil, convertToCamelCase }) => {
    const response = await provider.txStatus(transactionHash, signerId, waitUntil);
    return convertToCamelCase ? toCamelCase(response) : response;
  };
