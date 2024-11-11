import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

// https://docs.near.org/api/rpc/block-chunk#block-details

export const getBlock =
  (provider) =>
  async ({ finality, blockId }) => {
    const response = await provider.block(
      getBlockTarget({ finality, blockId, format: 'camelCase' }),
    );
    return toCamelCase(response);
  };
