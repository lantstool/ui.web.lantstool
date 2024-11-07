import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';
import { toBase64 } from '../../../../../helpers/toBase64.js';

export const getStateChanges =
  (provider) =>
  async ({ contractIds, keyPrefix, finality, blockId }) => {
    const response = await provider.contractStateChanges(
      contractIds,
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
      toBase64(keyPrefix),
    );
    return toCamelCase(response);
  };
