import { getBlockTargetParams } from '../utils.js';

const rpcCaller = (rpc, params) => {
  const accountIds = params.accountIds.map(({ accountId }) => accountId.value);

  return rpc.getChangesForAccountKeys(
    getBlockTargetParams({
      accountIds,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
};

export const getChangesForAccountKeys = {
  rpcCaller,
};
