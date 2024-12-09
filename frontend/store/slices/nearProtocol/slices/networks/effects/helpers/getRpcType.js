/*
  1. Get current block height
  2. Get epoch_length.
  3. Calculate the block issued 6 epoch away - the regular rpc keep only the 5 last epoches
  4. Try to fetch it - if ok - it's an archival rpc

  TODO we may have a situation when user will try to add the RPC of a newly
    created local network. In this case we can't detect if RPC runs in regular
    or archival mode - this algorithm will assume that it's an archived RPC.
    For such case we need to add a UI with ability to select of RPC type.
 */

export const getRpcType = async (rpcProvider, epochLength) => {
  try {
    const latestBlock = await rpcProvider.getBlock({});
    const archivedBlockHeight = latestBlock.header.height - epochLength * 6;
    // if user run a new local node with a lifetime less than 6 epochs - assume that's a regular node
    if (archivedBlockHeight <= 0) return 'regular';

    await rpcProvider.getBlock({ blockId: archivedBlockHeight });
    return 'archival';
  } catch (e) {
    // It's the default rpc error when the rpc can't find a block
    if (e?.rpc?.cause?.name === 'UNKNOWN_BLOCK') return 'regular';
    throw e;
  }
};
