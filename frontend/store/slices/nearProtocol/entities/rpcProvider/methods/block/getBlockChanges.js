import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/block-chunk#changes-in-block

export async function getBlockChanges({ finality, blockId, responseNameConvention = 'camelCase' }) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_changes_in_block',
      params: getBlockTarget({ finality, blockId }),
    },
    responseNameConvention,
  });
}
