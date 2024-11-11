import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getAccountKeys = (rpc, params) =>
  rpc.getAccountKeys(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
