import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/contracts#view-account-changes

export async function getAccountChanges({
  accountIds,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_changes',
      params: {
        changes_type: 'account_changes',
        account_ids: accountIds,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
