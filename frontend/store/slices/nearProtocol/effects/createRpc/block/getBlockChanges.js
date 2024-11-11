import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

// https://docs.near.org/api/rpc/block-chunk#changes-in-block

export const getBlockChanges =
  (provider) =>
  async ({ finality, blockId }) => {
    const response = await provider.blockChanges(
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
    );
    return toCamelCase(response);
  };
