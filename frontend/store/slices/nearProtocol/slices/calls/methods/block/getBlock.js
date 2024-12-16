import { getBlockTargetParams } from '../utils.js';

export const getBlock = (rpc, params) =>
  rpc.getBlock(
    getBlockTargetParams({
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
