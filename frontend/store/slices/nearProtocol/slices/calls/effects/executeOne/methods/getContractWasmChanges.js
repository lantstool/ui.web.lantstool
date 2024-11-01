import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

export const getContractWasmChanges = (rpc, params) =>
  rpc.contract.getCodeChanges(
    getBlockTargetParams({
      contractIds: [params.contractId.value],
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
