import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const getChanges =
  (provider) =>
  async ({ accountIds, finality, blockId }) => {
    const response = await provider.accountChanges(
      accountIds,
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
    );
    return toCamelCase(response);
  };
