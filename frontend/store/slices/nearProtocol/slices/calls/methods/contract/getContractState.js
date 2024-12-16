import { getBlockTargetParams } from '../utils.js';

export const getContractState = (rpc, params) =>
  rpc.getContractState(
    getBlockTargetParams({
      contractId: params.contractId.value,
      keyPrefix: params.keyPrefix,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
