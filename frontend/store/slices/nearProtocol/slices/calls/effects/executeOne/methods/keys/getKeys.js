import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getKeys = (rpc, params) =>
  rpc.keys.viewAccessKeyList(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
