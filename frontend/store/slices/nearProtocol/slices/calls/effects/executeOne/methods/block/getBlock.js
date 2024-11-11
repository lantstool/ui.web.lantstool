import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getBlock = (rpc, params) =>
  rpc.getBlock(
    getBlockTargetParams({
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
