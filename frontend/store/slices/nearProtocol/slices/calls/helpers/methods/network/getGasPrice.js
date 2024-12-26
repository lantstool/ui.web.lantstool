import {
  getBlockTargetParams,
  getFormBlockTarget,
  transformForExport,
} from '../utils.js';

const rpcCaller = (rpc, params) => {
  const blockId = params.blockTarget === 'latest' ? null : params.blockId;
  return rpc.getGasPrice({ blockId, responseNameConvention: 'snake_case' });
};

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      accountId: params.accountId?.value || '',
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => ({
  accountId: { value: params.accountId, label: params.accountId },
  ...getFormBlockTarget(params),
});

export const getGasPrice = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
