import { getBlockTargetParams } from '../utils.js';

export const getAccountKeys = (rpc, params) =>
  rpc.getAccountKeys(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
