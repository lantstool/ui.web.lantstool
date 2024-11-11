/*
  finality: Enum('final' | 'optimistic' | 'near-final')
  blockId: Enum(block_height | block_hash)
    block_height: Number (178317729)
    block_hash: String ('GkBD5hUvXN8Xf4ujYusZLpLoNn3zfkhZoq67bjWaRVaX')
 */

export const parseBlockId = (blockId) => {
  const isInteger = /^[0-9]+$/.test(blockId);
  return isInteger ? Number(blockId) : blockId.trim();
};

export const getBlockTarget = ({ finality = 'final', blockId }) =>
  blockId ? { block_id: parseBlockId(blockId) } : { finality };
