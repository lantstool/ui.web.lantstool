import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

export const getContractStateChanges = (rpc, params) =>
  rpc.contract.getStateChanges(
    getBlockTargetParams({
      contractIds: [params.contractId.value],
      keyPrefix: params.keyPrefix,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
