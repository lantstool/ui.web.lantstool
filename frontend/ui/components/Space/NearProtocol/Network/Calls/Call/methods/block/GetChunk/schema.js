import { object, string } from 'yup';

export const schema = object({
  chunkId: string().test('mandatory', 'Chunk Id is a mandatory field', (value, context) => {
    if (context.parent.searchType !== 'byChunkId') return true;
    return Boolean(value);
  }),
  blockId: string().test('mandatory', 'Block Id is a mandatory field', (value, context) => {
    if (context.parent.searchType !== 'inBlock') return true;
    return Boolean(value);
  }),
  shardId: string().test('mandatory', 'Shard Id is a mandatory field', (value, context) => {
    if (context.parent.searchType !== 'inBlock') return true;
    return Boolean(value);
  }),
});
