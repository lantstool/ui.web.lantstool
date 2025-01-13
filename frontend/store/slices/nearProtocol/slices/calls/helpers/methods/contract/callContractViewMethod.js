import { decompress } from 'fzstd';
import {
  getBlockTargetParams,
  getDropdownValueForExport,
  getDropdownValueForImport,
  getFormBlockTarget,
  transformForExport,
} from '../utils.js';
import { getFormattedJSON } from '../../../../../../../helpers/utils.js';

const getJsonABI = (result) => {
  const raw = decompress(new Uint8Array(result));
  const json = new TextDecoder().decode(raw);
  return JSON.parse(json);
};

const getResult = (result, methodName) => {
  if (methodName === '__contract_abi') return getJsonABI(result);
  return JSON.parse(Buffer.from(result).toString());
};

const rpcCaller = async (rpc, params) => {
  const result = await rpc.callContractViewMethod(
    getBlockTargetParams({
      contractId: params.contractId.value,
      methodName: params.methodName.value,
      args: params.args,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

  return getResult(result.result, params.methodName.value);
};

const getArgsForExport = (args) => {
  try {
    return JSON.parse(args);
  } catch (e) {
    return String(args);
  }
};

const getArgsFromImport = (args) => {
  try {
    return getFormattedJSON(args);
  } catch (e) {
    return String(args);
  }
};

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      contractId: getDropdownValueForExport(params.contractId),
      methodName: getDropdownValueForExport(params.methodName),
      args: getArgsForExport(params.args),
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => ({
  contractId: getDropdownValueForImport(params.contractId),
  methodName: getDropdownValueForImport(params.methodName),
  args: getArgsFromImport(params.args),
  ...getFormBlockTarget(params),
});

export const callContractViewMethod = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
