import {
  getBlockTargetParams,
  getDropdownValueForExport,
  getDropdownValueForImport,
  getFormBlockTarget,
  transformForExport,
} from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getAccountKey(
    getBlockTargetParams({
      accountId: params.accountId.value,
      publicKey: params.publicKey.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      accountId: getDropdownValueForExport(params.accountId),
      publicKey: getDropdownValueForExport(params.publicKey),
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => ({
  accountId: getDropdownValueForImport(params.accountId),
  publicKey: getDropdownValueForImport(params.publicKey),
  ...getFormBlockTarget(params),
});

export const getAccountKey = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
