import {
  getBlockTargetParams,
  getDropdownValueForExport,
  getDropdownValueForImport,
  getFormBlockTarget,
  transformForExport,
} from '../utils.js';

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

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      contractId: getDropdownValueForExport(params.contractId),
      keyPrefix: params.keyPrefix,
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => ({
  contractId: getDropdownValueForImport(params.contractId),
  keyPrefix: params.keyPrefix,
  ...getFormBlockTarget(params),
});

export const getContractState = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
