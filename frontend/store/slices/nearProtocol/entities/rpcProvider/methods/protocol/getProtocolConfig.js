import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/protocol#protocol-config

export async function getProtocolConfig({
  finality,
  blockId,
  responseNameConvention = 'camelCase',
} = {}) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_protocol_config',
      params: getBlockTarget({ finality, blockId }),
    },
    responseNameConvention,
  });
}
