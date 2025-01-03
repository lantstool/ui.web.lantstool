import {
  getBlockTargetParams,
  getDropdownValueForExport,
  getDropdownValueForImport,
  getFormBlockTarget,
  transformForExport,
} from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getContractWasm(
    getBlockTargetParams({
      contractId: params.contractId.value,
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
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => ({
  contractId: getDropdownValueForImport(params.contractId),
  ...getFormBlockTarget(params),
});

export const getContractWasm = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
