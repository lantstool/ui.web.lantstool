import { getBlockTargetParams } from '../../utils.js';
import { exportTransformer } from './exportTransformer.js';
import { importTransformers } from './importTransformers.js';
import { getJsonABI } from '../../../../../../helpers/getJsonAbi.js';
import JSON5 from 'json5';

const getResult = (result, methodName) => {
  if (methodName === '__contract_abi') return getJsonABI(result);
  return JSON.parse(Buffer.from(result).toString());
};

const json5ToJson = (args) => {
  try {
    return JSON.stringify(JSON5.parse(args));
  } catch (e) {
    return '';
  }
};

const rpcCaller = async (rpc, params) => {
  const result = await rpc.callContractViewMethod(
    getBlockTargetParams({
      contractId: params.contractId.value,
      methodName: params.methodName.value,
      args: json5ToJson(params.args),
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
  return getResult(result.result, params.methodName.value);
};

export const callContractViewMethod = {
  rpcCaller,
  exportTransformer,
  importTransformers,
};
