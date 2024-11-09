import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const getChangesForAccountKeys =
  (provider) =>
  async ({ accountIds, finality, blockId }) => {
    const response = await provider.accessKeyChanges(
      accountIds,
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
    );
    return toCamelCase(response);
  };
