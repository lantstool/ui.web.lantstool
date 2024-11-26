import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/access-keys#view-access-key

export async function getAccountKey({
  accountId,
  publicKey,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'query',
      params: {
        request_type: 'view_access_key',
        account_id: accountId,
        public_key: publicKey,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
