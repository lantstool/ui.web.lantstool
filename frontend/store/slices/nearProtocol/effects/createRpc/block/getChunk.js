import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { parseBlockId } from '../helpers/getBlockTarget.js';

// https://docs.near.org/api/rpc/block-chunk#chunk-details

export const getChunk =
  (provider) =>
  async ({ chunkId, blockId, shardId, convertToCamelCase }) => {
    const args = chunkId ? chunkId : [parseBlockId(blockId), Number(shardId)];
    const response = await provider.chunk(args);
    return convertToCamelCase ? toCamelCase(response) : response;
  };
