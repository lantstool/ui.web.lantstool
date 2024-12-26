import {
  getDropdownValueForExport,
  getDropdownValueForImport,
  transformForExport,
} from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getMaintenanceWindows({
    validatorId: params.validatorId.value,
    responseNameConvention: 'snake_case',
  });

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) => ({
    validatorId: getDropdownValueForExport(params.validatorId),
  }),
});

const importTransformer = ({ params }) => ({
  validatorId: getDropdownValueForImport(params.validatorId),
});

export const getMaintenanceWindows = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
