import { getBlockTargetParams } from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getAccountKeys(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

export const getAccountKeys = {
  rpcCaller,
};
