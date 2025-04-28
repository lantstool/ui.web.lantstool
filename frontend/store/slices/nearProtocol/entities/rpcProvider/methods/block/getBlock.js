import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/block-chunk#block-details

export async function getBlock({ finality, blockId, responseNameConvention = 'camelCase' } = {}) {
  return await this.sendRequest({
    body: {
      method: 'block',
      params: getBlockTarget({ finality, blockId }),
    },
    responseNameConvention,
  });
}
