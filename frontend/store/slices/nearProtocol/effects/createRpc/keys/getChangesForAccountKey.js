import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

// https://docs.near.org/api/rpc/access-keys#view-access-key-changes-single

export const getChangesForAccountKey =
  (provider) =>
  async ({ accountKeyPairs, finality, blockId }) => {
    const pairs = accountKeyPairs.map((pair) => ({
      account_id: pair.accountId,
      public_key: pair.publicKey,
    }));

    const response = await provider.singleAccessKeyChanges(
      pairs,
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
    );
    return toCamelCase(response);
  };
