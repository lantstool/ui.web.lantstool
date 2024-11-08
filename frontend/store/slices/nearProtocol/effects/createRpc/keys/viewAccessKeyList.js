import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const viewAccessKeyList =
  (provider) =>
  async ({ accountId, finality, blockId }) => {
    const response = await provider.query({
      request_type: 'view_access_key_list',
      account_id: accountId,
      ...getBlockTarget({ finality, blockId }),
    });
    return toCamelCase(response);
  };
