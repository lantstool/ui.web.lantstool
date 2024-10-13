import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const viewAccount =
  (provider) =>
  async (accountId, finality = 'final') => {
    const response = await provider.query({
      request_type: 'view_account',
      finality,
      account_id: accountId,
    });
    return toCamelCase(response);
  };
