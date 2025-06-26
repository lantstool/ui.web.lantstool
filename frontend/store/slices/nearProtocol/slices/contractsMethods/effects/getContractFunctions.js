import { effect } from '@react-vault';
import { base64ToArrayBuffer } from '../../../../../helpers/base64ToArrayBuffer.js';
import { getExportedWasmFunctions } from '../../../../../helpers/getExportedWasmFunctions.js';
import { getJsonABI } from '../../../helpers/getJsonAbi.js';
import { createTemplateFromAbi } from '../helpers/createTemplateFromAbi/createTemplateFromAbi.js';

export const getContractFunctions = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, contractId } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setFunctions = slice.getActions((slice) => slice.setFunctions);
  const records = slice.getState((slice) => slice.records);
  const emptyFunctions = { isAbiSupported: false, functions: [] };

  try {
    if (!contractId) return emptyFunctions;

    await rpc.configure({ spaceId, networkId });
    const { codeHash } = await rpc.getAccount({ accountId: contractId });

    if (codeHash === '11111111111111111111111111111111') return emptyFunctions;

    if (records[codeHash]) return records[codeHash];

    const [contractWasm, abi] = await Promise.allSettled([
      rpc.getContractWasm({ contractId }),
      rpc.callContractViewMethod({ contractId, methodName: '__contract_abi', args: '' }),
    ]);

    const jsonAbi = abi.status === 'fulfilled' ? getJsonABI(abi?.value?.result) : null;

    //Add new contract with ABI
    if (jsonAbi?.schema_version === '0.4.0') {
      const jsonAbi = getJsonABI(abi?.value?.result);
      const functions = await createTemplateFromAbi(jsonAbi);
      setFunctions({ codeHash, functions });
      return functions;
    }

    //Add new contract without ABI
    if (contractWasm.status === 'fulfilled') {
      const arrayBuffer = base64ToArrayBuffer(contractWasm.value.codeBase64);
      const exportedFunctions = await getExportedWasmFunctions(arrayBuffer);
      const functions = {
        isAbiSupported: false,
        functions: exportedFunctions.map((fn) => fn.name),
      };
      setFunctions({ codeHash, functions });
      return functions;
    }

    return emptyFunctions;
  } catch (e) {
    console.log(e);
    return emptyFunctions;
  }
});
