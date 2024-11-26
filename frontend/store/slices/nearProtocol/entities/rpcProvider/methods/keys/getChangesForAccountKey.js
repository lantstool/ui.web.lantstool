import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/access-keys#view-access-key-changes-single

export async function getChangesForAccountKey({
  accountKeyPairs,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  const pairs = accountKeyPairs.map((pair) => ({
    account_id: pair.accountId,
    public_key: pair.publicKey,
  }));

  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_changes',
      params: {
        changes_type: 'single_access_key_changes',
        keys: pairs,
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
