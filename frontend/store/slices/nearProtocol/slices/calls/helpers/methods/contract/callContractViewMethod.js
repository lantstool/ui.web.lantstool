import { decompress } from 'fzstd';
import {
  getBlockTargetParams,
  getDropdownValueForExport,
  getDropdownValueForImport,
  getFormBlockTarget,
  transformForExport,
} from '../utils.js';

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

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      contractId: getDropdownValueForExport(params.contractId),
      method: getDropdownValueForExport(params.methodName), // TODO Rename methodName to method in the whole app
      args: params.args,
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => ({
  contractId: getDropdownValueForImport(params.contractId),
  methodName: getDropdownValueForImport(params.method),
  args: params.args,
  ...getFormBlockTarget(params),
});

export const callContractViewMethod = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
