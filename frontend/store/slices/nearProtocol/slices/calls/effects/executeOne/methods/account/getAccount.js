import { getBlockTargetParams } from '../utils.js';

export const getAccount = (rpc, params) =>
  rpc.getAccount(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
