import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getChunk,
  searchType: 'byChunkId',
  chunkId: '',
  blockId: '',
  shardId: '',
};
