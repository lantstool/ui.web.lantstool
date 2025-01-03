import { getFormBlockTarget, transformForExport } from '../utils.js';

const getParamsBySearchTarget = ({ searchType, chunkId, blockId, shardId }) =>
  searchType === 'byChunkId' ? { chunkId } : { blockId, shardId };

const rpcCaller = (rpc, params) =>
  rpc.getChunk({
    ...getParamsBySearchTarget(params),
    responseNameConvention: 'snake_case',
  });

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) => getParamsBySearchTarget(params),
});

const importTransformer = ({ params }) => {
  const { chunkId, blockId, shardId } = params;
  const searchParams = chunkId
    ? { searchType: 'byChunkId', chunkId }
    : { searchType: 'inBlock', blockId, shardId };

  return {
    ...searchParams,
    ...getFormBlockTarget(params),
  };
};

export const getChunk = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
