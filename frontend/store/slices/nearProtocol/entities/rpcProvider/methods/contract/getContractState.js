import { toBase64 } from '../../../../../../helpers/toBase64.js';
import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/contracts#view-contract-state

export async function getContractState({
  contractId,
  keyPrefix,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'query',
      params: {
        request_type: 'view_state',
        account_id: contractId,
        prefix_base64: toBase64(keyPrefix),
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
