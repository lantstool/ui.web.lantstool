import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const accountChanges =
  (provider) =>
  async ({ accountId, finality, blockId }) => {
    const response = await provider.accountChanges(
      [accountId],
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
    );
    return toCamelCase(response);
  };
