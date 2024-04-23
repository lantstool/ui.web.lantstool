export const methods = [
  {
    type: 'EXPERIMENTAL_changes_in_block',
    text: 'Changes in Block',
    method: 'EXPERIMENTAL_changes_in_block',
    params: {
      type: 'finality',
      finality: 'final',
      block_id: '',
    },
  },
  {
    type: 'chunk',
    text: 'Chunk Details',
    method: 'chunk',
    params: {
      type: 'chunk_id',
      chunk_id: '',
      block_id: '',
      shard_id: '',
    },
  },
];
