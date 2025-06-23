import { effect } from '@react-vault';
import { createTemplateObject } from '../helpers/createTemplateObject/createTemplateObject.js';
import { base64ToArrayBuffer } from '../../../../../helpers/base64ToArrayBuffer.js';
import { getExportedWasmFunctions } from '../../../../../helpers/getExportedWasmFunctions.js';
import { getJsonABI } from '../../../helpers/getJsonAbi.js';

const createTemplateFromAbi = (abi) => {
  const readFunctions = {};
  const writeFunctions = {};

  for (const fn of abi.body.functions) {
    const { name, params, modifiers, kind } = fn;
    let args;

    if (!params || params.args.length === 0) {
      args = '// This function has no params specified in ABI';
    } else if (params.serialization_type !== 'json') {
      args = '// This function uses a non-JSON serialization type';
    } else {
      try {
        args = createTemplateObject(params.args, abi.body.root_schema);
      } catch (e) {
        args = `// Error during parsing ABI: ${e.message}`;
      }
    }

    const method = {
      args,
      modifiers: modifiers ?? null,
    };

    if (kind === 'view') readFunctions[name] = method;
    if (kind === 'call') writeFunctions[name] = method;
  }

  readFunctions.__contract_abi = {
    args: '// This function has no params specified in ABI',
    modifiers: null,
  };

  return { isAbiSupported: true, readFunctions, writeFunctions };
};

export const addContract = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, formValues } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setFunctions = slice.getActions((slice) => slice.setFunctions);
  const setContractHash = slice.getActions((slice) => slice.setContractHash);
  const records = slice.getState((slice) => slice.records);

  try {
    await rpc.configure({ spaceId, networkId });
    const contractId = formValues.contractId?.value;

    if (!contractId) return;

    const { codeHash } = await rpc.getAccount({ accountId: contractId });

    if (codeHash === '11111111111111111111111111111111') {
      return setContractHash(null);
    }

    setContractHash(codeHash);
    if (records[codeHash]) return;

    const [contractWasm, abi] = await Promise.allSettled([
      rpc.getContractWasm({ contractId }),
      rpc.callContractViewMethod({ contractId, methodName: '__contract_abi', args: '' }),
    ]);

    const jsonAbi = abi.status === 'fulfilled' ? getJsonABI(abi?.value?.result) : null;

    //Add new contract without ABI
    if (abi.status === 'rejected' || jsonAbi.schema_version !== '0.4.0') {
      const arrayBuffer = base64ToArrayBuffer(contractWasm.value.codeBase64);
      const exportedFunctions = await getExportedWasmFunctions(arrayBuffer);
      const functions = {
        isAbiSupported: false,
        functions: exportedFunctions.map((fn) => fn.name),
      };
      return setFunctions({ codeHash, functions });
    }

    const functions = createTemplateFromAbi(jsonAbi);
    setFunctions({ codeHash, functions });
  } catch (e) {
    console.log(e);
    setContractHash(null);
  }
});
