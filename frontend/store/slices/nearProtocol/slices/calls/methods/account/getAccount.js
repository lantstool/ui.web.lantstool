import { getBlockTargetParams, transformForExport } from '../utils.js';

const defaultFormValues = {
  method: { value: 'getAccount', label: 'Get Account' },
  accountId: null,
  blockTarget: 'latest',
  finality: { value: 'final', label: 'Final' },
  blockId: '',
};

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
      accountId: params.accountId?.value || null,
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

export const getAccount = {
  defaultFormValues,
  rpcCaller,
  exportTransformer,
};
