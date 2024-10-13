import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const getKey =
  (provider) =>
  async (accountId, publicKey, finality = 'final') => {
    const response = await provider.query({
      request_type: 'view_access_key',
      finality,
      account_id: accountId,
      public_key: publicKey,
    });
    return toCamelCase(response);
  };
