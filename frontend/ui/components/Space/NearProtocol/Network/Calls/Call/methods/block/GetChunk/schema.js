import { object, string } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  chunkId: string()
    .max(44)
    .when('searchType', {
      is: 'byChunkId',
      then: () => schemes.hash('Chunk ID'),
    }),
  blockId: string()
    .max(44)
    .when('searchType', {
      is: 'inBlock',
      then: () => schemes.blockId,
    }),
  shardId: string().when('searchType', {
    is: 'inBlock',
    then: (schema) => schema.required('Shard ID is a required field'),
  }),
});
