import { toBase64 } from '../../../../../helpers/toBase64.js';
import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/contracts#view-contract-code-changes

export async function getContractStateChanges({
  contractIds,
  keyPrefix,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_changes',
      params: {
        changes_type: 'data_changes',
        account_ids: contractIds,
        key_prefix_base64: toBase64(keyPrefix),
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
