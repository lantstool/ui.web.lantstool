import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getBlockChanges = (rpc, params) =>
  rpc.getBlockChanges(
    getBlockTargetParams({
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
