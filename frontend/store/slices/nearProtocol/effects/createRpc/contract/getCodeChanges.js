import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const getCodeChanges =
  (provider) =>
  async ({ contractIds, finality, blockId }) => {
    const response = await provider.contractCodeChanges(
      contractIds,
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
    );
    return toCamelCase(response);
  };
