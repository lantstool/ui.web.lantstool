import { decompress } from 'fzstd';

const getJsonABI = (result) => {
  const raw = decompress(new Uint8Array(result));
  const json = new TextDecoder().decode(raw);
  return JSON.parse(json);
};

const getResult = (result, methodName) => {
  if (methodName === '__contract_abi') return getJsonABI(result);
  return JSON.parse(Buffer.from(result).toString());
};

export const callContractViewMethod = async (rpc, params) => {
  const result = await rpc.contract.callFunction(params);
  return getResult(result.result, params.methodName);
};
