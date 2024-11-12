import { getBlockTargetParams } from '../utils.js';

export const getAccountChanges = (rpc, params) => {
  const accountIds = params.accountIds.map(({ accountId }) => accountId.value);

  return rpc.getAccountChanges(
    getBlockTargetParams({
      accountIds,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
};
