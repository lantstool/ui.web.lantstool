import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const viewCode =
  (provider) =>
  async ({ contractId, finality = 'final', blockId }) => {
    const response = await provider.query({
      request_type: 'view_code',
      account_id: contractId,
      finality,
      blockId,
    });
    return toCamelCase(response);
  };
