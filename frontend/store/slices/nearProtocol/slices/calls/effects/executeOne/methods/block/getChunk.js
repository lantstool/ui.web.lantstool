export const getChunk = (rpc, { searchType, chunkId, blockId, shardId }) => {
  const args = searchType === 'byChunkId' ? { chunkId } : { blockId, shardId };
  return rpc.getChunk(args);
};
