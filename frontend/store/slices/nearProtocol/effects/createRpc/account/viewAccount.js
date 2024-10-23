import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const viewAccount =
  (provider) =>
  async ({ accountId, finality = 'final', blockId }) => {
    const response = await provider.query({
      request_type: 'view_account',
      account_id: accountId,
      finality,
      block_id: blockId,
    });
    return toCamelCase(response);
  };
