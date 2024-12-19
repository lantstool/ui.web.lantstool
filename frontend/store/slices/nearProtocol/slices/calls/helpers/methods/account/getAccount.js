import { getBlockTargetParams, transformForExport } from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getAccount(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

const exportTransformer = transformForExport({
  paramsExtractor: (params) =>
    getBlockTargetParams({
      accountId: params.accountId?.value || '',
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

export const getAccount = {
  rpcCaller,
  exportTransformer,
};
