import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/contracts#view-contract-code-changes

export async function getContractWasmChanges({
  contractIds,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_changes',
      params: {
        changes_type: 'contract_code_changes',
        account_ids: contractIds,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
