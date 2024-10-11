import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const getKeyList =
  (provider) =>
  async (accountId, finality = 'final') => {
    const response = await provider.query({
      request_type: 'view_access_key_list',
      finality,
      account_id: accountId,
    });
    return toCamelCase(response);
  };
