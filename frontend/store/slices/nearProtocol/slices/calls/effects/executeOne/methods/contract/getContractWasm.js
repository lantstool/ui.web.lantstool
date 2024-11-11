import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getContractWasm = (rpc, params) =>
  rpc.contract.viewCode(
    getBlockTargetParams({
      contractId: params.contractId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
