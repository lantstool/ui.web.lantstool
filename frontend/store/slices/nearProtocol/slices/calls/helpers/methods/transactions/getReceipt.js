import { transformForExport } from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getReceipt({
    receiptId: params.receiptId,
    responseNameConvention: 'snake_case',
  });

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) => ({
    receiptId: params.receiptId,
  }),
});

const importTransformer = ({ params }) => ({
  receiptId: params.receiptId,
});

export const getReceipt = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
