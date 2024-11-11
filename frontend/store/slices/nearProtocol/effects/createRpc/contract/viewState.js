import { toBase64 } from '../../../../../helpers/toBase64.js';
import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const viewState =
  (provider) =>
  async ({ contractId, keyPrefix, finality, blockId }) => {
    const response = await provider.query({
      request_type: 'view_state',
      account_id: contractId,
      prefix_base64: toBase64(keyPrefix),
      ...getBlockTarget({ finality, blockId }),
    });
    return toCamelCase(response);
  };
