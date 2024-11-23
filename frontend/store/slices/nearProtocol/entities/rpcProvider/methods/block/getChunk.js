import { parseBlockId } from '../utils.js';

// https://docs.near.org/api/rpc/block-chunk#block-details

export async function getChunk({
  chunkId,
  blockId,
  shardId,
  responseNameConvention = 'camelCase',
}) {
  const params = chunkId
    ? { chunk_id: chunkId }
    : { block_id: parseBlockId(blockId), shard_id: Number(shardId) };

  return await this.sendRequest({
    body: {
      method: 'chunk',
      params,
    },
    responseNameConvention,
  });
}
