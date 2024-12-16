import { getBlockTargetParams } from '../utils.js';

export const getContractWasmChanges = (rpc, params) => {
  const contractIds = params.contractIds.map(({ contractId }) => contractId.value);

  return rpc.getContractWasmChanges(
    getBlockTargetParams({
      contractIds,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
};
