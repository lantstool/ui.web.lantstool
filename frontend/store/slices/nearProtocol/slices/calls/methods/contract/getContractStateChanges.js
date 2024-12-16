import { getBlockTargetParams } from '../utils.js';

export const getContractStateChanges = (rpc, params) => {
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
}

