import { parseBlockId } from '../utils.js';

// https://docs.near.org/api/rpc/gas#gas-price

export async function getGasPrice({ blockId = null, responseNameConvention = 'camelCase' }) {
  return await this.sendRequest({
    body: {
      method: 'gas_price',
      params: [parseBlockId(blockId)],
    },
    responseNameConvention,
  });
}
