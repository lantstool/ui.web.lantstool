import { getBlockTargetParams } from '../utils.js';

const rpcCaller = (rpc, params) => {
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

export const getContractWasmChanges = {
  rpcCaller,
};
