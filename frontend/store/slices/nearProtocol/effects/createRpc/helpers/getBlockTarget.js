/*
  finality: Enum('final' | 'optimistic' | 'near-final')
  blockId: Enum(block_height | block_hash)
    block_height: Number (178317729)
    block_hash: String ('GkBD5hUvXN8Xf4ujYusZLpLoNn3zfkhZoq67bjWaRVaX')
 */

export const parseBlockId = (blockId) => {
  const parsedBlockId = parseInt(blockId);
  return Number.isNaN(parsedBlockId) ? blockId.trim() : parsedBlockId;
};

export const getBlockTarget = ({ finality = 'final', blockId, format = 'snake_case' }) => {
  if (!blockId) return { finality };

  const id = parseBlockId(blockId);
  return format === 'camelCase' ? { blockId: id } : { block_id: id };
};
