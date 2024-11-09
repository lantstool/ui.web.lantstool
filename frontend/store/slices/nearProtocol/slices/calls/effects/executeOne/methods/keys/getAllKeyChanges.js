import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getAllKeyChanges = (rpc, params) => {
  const accountIds = params.accountIds.map(({ accountId }) => accountId.value);

  return rpc.keys.getAllKeyChanges(
    getBlockTargetParams({
      accountIds,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
};
