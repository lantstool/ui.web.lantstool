import { getBlockTargetParams } from '../utils.js';

export const getProtocolConfig = (rpc, params) =>
  rpc.getProtocolConfig(
    getBlockTargetParams({
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
