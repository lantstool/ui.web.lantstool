import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const viewCode =
  (provider) =>
  async ({ contractId, finality, blockId }) => {
    const response = await provider.query({
      request_type: 'view_code',
      account_id: contractId,
      ...getBlockTarget({ finality, blockId }),
    });
    return toCamelCase(response);
  };
