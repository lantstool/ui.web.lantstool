import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const viewState =
  (provider) =>
  async ({ contractId, prefix, finality, blockId }) => {
    const response = await provider.query({
      request_type: 'view_state',
      account_id: contractId,
      prefix_base64: Buffer.from(prefix).toString('base64'),
      ...getBlockTarget({ finality, blockId }),
    });
    return toCamelCase(response);
  };
