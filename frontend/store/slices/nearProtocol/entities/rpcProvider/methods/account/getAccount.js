import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/contracts#view-account

export async function getAccount({
  accountId,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'query',
      params: {
        request_type: 'view_account',
        account_id: accountId,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
