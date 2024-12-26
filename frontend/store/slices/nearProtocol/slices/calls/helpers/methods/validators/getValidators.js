import { transformForExport } from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getValidators({
    epochId: params.epochTarget === 'latest' ? null : params.epochId,
    responseNameConvention: 'snake_case',
  });

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) => ({
    epochId: params.epochTarget === 'latest' ? null : params.epochId,
  }),
});

const importTransformer = ({ params }) => ({
  epochId: params.epochId,
  epochTarget: params.epochId === null ? 'latest' : 'specific',
});

export const getValidators = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
