import { getBlockTargetParams, transformForExport } from '../utils.js';

const rpcCaller = (rpc, params) => {
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

const exportTransformer = transformForExport({
  paramsExtractor: (params) => {
    const accountIds = params.accountIds
      .map(({ accountId }) => accountId?.value)
      .filter((accountId) => !!accountId);

    return getBlockTargetParams({
      accountIds,
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    });
  },
});

export const getAccountChanges = {
  rpcCaller,
  exportTransformer,
};
