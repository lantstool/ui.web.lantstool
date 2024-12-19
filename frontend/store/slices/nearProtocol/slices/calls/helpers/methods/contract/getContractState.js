import { getBlockTargetParams } from '../utils.js';

const rpcCaller = (rpc, params) =>
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

export const getContractState = {
  rpcCaller,
};
