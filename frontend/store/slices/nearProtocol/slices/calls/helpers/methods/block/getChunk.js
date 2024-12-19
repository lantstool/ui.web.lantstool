const rpcCaller = (rpc, { searchType, chunkId, blockId, shardId }) => {
  const args = searchType === 'byChunkId' ? { chunkId } : { blockId, shardId };

  return rpc.getChunk({
    ...args,
    responseNameConvention: 'snake_case',
  });
};

export const getChunk = {
  rpcCaller,
};
