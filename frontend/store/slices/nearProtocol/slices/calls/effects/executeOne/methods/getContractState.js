import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

export const getContractState = (rpc, params) =>
  rpc.contract.viewState(
    getBlockTargetParams({
      contractId: params.contractId.value,
      prefix: params.prefix,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.finality.blockId,
    }),
  );
