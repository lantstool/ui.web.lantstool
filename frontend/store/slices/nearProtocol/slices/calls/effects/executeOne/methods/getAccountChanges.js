import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

export const getAccountChanges = (rpc, params) =>
  rpc.account.accountChanges(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.finality.blockId,
    }),
  );
