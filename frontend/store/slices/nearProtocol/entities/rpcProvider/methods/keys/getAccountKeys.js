import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/access-keys#view-access-key-list

export async function getAccountKeys({
  accountId,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'query',
      params: {
        request_type: 'view_access_key_list',
        account_id: accountId,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
