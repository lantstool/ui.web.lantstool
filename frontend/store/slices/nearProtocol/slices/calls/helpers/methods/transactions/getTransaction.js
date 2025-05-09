import {
  getDropdownValueForExport,
  getDropdownValueForImport,
  getFormWaitUntil,
  transformForExport,
} from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getTransaction({
    transactionHash: params.transactionHash,
    signerId: params.signerId.value,
    waitUntil: params.waitUntil.value,
    responseNameConvention: 'snake_case',
  });

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) => ({
    transactionHash: params.transactionHash,
    signerId: getDropdownValueForExport(params.signerId),
    waitUntil: params.waitUntil.value,
  }),
});

const importTransformer = ({ params }) => ({
  transactionHash: params.transactionHash,
  signerId: getDropdownValueForImport(params.signerId),
  waitUntil: getFormWaitUntil(params.waitUntil),
});

export const getTransaction = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
