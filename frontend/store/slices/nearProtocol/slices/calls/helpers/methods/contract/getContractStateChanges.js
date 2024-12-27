import { getBlockTargetParams, getFormBlockTarget, transformForExport } from '../utils.js';

const rpcCaller = (rpc, params) => {
  const contractIds = params.contractIds.map(({ contractId }) => contractId.value);

  return rpc.getContractStateChanges(
    getBlockTargetParams({
      contractIds,
      keyPrefix: params.keyPrefix,
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
    const contractIds = params.contractIds
      .map(({ contractId }) => contractId?.value)
      .filter((contractId) => !!contractId);

    return getBlockTargetParams({
      contractIds,
      keyPrefix: params.keyPrefix,
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    });
  },
});

const importTransformer = ({ params }) => {
  const contractIds =
    params.contractIds.length === 0
      ? [{ contractId: null }]
      : params.contractIds.map((contractId) => ({
          contractId: { value: contractId, label: contractId },
        }));

  return {
    contractIds,
    keyPrefix: params.keyPrefix,
    ...getFormBlockTarget(params),
  };
};

export const getContractStateChanges = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
