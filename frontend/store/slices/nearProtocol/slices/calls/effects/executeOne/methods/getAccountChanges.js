import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

export const getAccountChanges = (rpc, params) =>
  rpc.account.getChanges(
    getBlockTargetParams({
      accountIds: [params.accountId.value],
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
