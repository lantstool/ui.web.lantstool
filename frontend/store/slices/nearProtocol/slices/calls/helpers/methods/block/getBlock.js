import { getBlockTargetParams } from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getBlock(
    getBlockTargetParams({
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

export const getBlock = {
  rpcCaller,
};
