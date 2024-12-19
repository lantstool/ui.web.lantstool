import { getBlockTargetParams } from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getProtocolConfig(
    getBlockTargetParams({
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

export const getProtocolConfig = {
  rpcCaller,
};
