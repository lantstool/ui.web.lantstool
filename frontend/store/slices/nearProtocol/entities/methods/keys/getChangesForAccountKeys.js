import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/access-keys#view-access-key-changes-all

export async function getChangesForAccountKeys({
  accountIds,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_changes',
      params: {
        changes_type: 'all_access_key_changes',
        account_ids: accountIds,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
