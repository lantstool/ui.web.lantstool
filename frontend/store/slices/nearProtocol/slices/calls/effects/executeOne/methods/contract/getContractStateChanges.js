import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getContractStateChanges = (rpc, params) => {
  const contractIds = params.contractIds.map(({ contractId }) => contractId.value);

  return rpc.contract.getStateChanges(
    getBlockTargetParams({
      contractIds,
      keyPrefix: params.keyPrefix,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
}

