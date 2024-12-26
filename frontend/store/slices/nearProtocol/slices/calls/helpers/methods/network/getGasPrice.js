import { transformForExport } from '../utils.js';

const rpcCaller = (rpc, params) => {
  const blockId = params.blockTarget === 'latest' ? null : params.blockId;
  return rpc.getGasPrice({ blockId, responseNameConvention: 'snake_case' });
};

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) => ({
    blockId: params.blockTarget === 'latest' ? null : params.blockId,
  }),
});

const importTransformer = ({ params }) => ({
  blockId: params.blockId,
  blockTarget: params.blockId === null ? 'latest' : 'specific',
});

export const getGasPrice = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
