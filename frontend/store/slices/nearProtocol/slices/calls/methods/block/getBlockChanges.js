import { getBlockTargetParams } from '../utils.js';

export const getBlockChanges = (rpc, params) =>
  rpc.getBlockChanges(
    getBlockTargetParams({
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
