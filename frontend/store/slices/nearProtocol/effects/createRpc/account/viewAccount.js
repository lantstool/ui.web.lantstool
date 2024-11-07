import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const viewAccount =
  (provider) =>
  async ({ accountId, finality, blockId }) => {
    const response = await provider.query({
      request_type: 'view_account',
      account_id: accountId,
      ...getBlockTarget({ finality, blockId }),
    });
    return toCamelCase(response);
  };
