import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const getWasm =
  (provider) =>
  async (contractId, finality = 'final') => {
    const response = await provider.query({
      request_type: 'view_code',
      finality,
      account_id: contractId,
    });
    return toCamelCase(response);
  };
