import { getBlockTargetParams, getFormBlockTarget, transformForExport } from '../utils.js';

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
  version: '1.0',
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

const importTransformer = ({ params }) => {
  const accountIds =
    params.accountIds.length === 0
      ? [{ accountId: null }]
      : params.accountIds.map((accountId) => ({
          accountId: { value: accountId, label: accountId },
        }));

  return {
    accountIds,
    ...getFormBlockTarget(params),
  };
};

export const getAccountChanges = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
