import { getBlockTargetParams } from '../utils.js';

export const getContractWasm = (rpc, params) =>
  rpc.getContractWasm(
    getBlockTargetParams({
      contractId: params.contractId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
