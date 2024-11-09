import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const getAccountKey =
  (provider) =>
  async ({ accountId, publicKey, finality, blockId }) => {
    const response = await provider.query({
      request_type: 'view_access_key',
      account_id: accountId,
      public_key: publicKey,
      ...getBlockTarget({ finality, blockId }),
    });
    return toCamelCase(response);
  };
