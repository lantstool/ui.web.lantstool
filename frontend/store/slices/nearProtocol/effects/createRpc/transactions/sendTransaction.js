import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

// https://docs.near.org/api/rpc/transactions#send-tx

export const sendTransaction =
  (provider) =>
  async ({ signedTransaction, waitUntil = 'EXECUTED_OPTIMISTIC', convertToCamelCase }) => {
    const response = await provider.sendTransactionUntil(signedTransaction, waitUntil);
    return convertToCamelCase ? toCamelCase(response) : response;
  };
