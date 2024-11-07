import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

export const getContractWasmChanges = (rpc, params) => {
  const contractIds = params.contractIds.map(({ contractId }) => contractId.value);

  return rpc.contract.getCodeChanges(
    getBlockTargetParams({
      contractIds,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
};
