import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const sendTx =
  (provider) =>
  async (signedTx, waitUntil = 'EXECUTED_OPTIMISTIC') => {
    const response = await provider.sendTransactionUntil(signedTx, waitUntil);
    return toCamelCase(response);
  };
