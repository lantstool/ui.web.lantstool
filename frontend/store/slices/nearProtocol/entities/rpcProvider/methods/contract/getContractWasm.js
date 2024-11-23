import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/contracts#view-contract-code

export async function getContractWasm({
  contractId,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'query',
      params: {
        request_type: 'view_code',
        account_id: contractId,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
