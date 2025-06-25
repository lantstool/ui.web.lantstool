import { effect } from '@react-vault';
import { createTemplateObject } from '../helpers/createTemplateObject/createTemplateObject.js';
import { base64ToArrayBuffer } from '../../../../../helpers/base64ToArrayBuffer.js';
import { getExportedWasmFunctions } from '../../../../../helpers/getExportedWasmFunctions.js';
import { getJsonABI } from '../../../helpers/getJsonAbi.js';
import { createStringTemplate } from '../helpers/createStringTemplate/createStringTemplate.js';

const createTemplateFromAbi = async (abi) => {
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
        const templateObject = createTemplateObject(params.args, abi.body.root_schema);
        args = await createStringTemplate(templateObject);
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
  const { spaceId, networkId, contractId, functionsType } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setFunctions = slice.getActions((slice) => slice.setFunctions);
  const setContractHash = slice.getActions((slice) => slice.setContractHash);
  const records = slice.getState((slice) => slice.records);

  try {
    if (!contractId) return;

    await rpc.configure({ spaceId, networkId });
    const { codeHash } = await rpc.getAccount({ accountId: contractId });
    console.log(codeHash);
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

    const functions = await createTemplateFromAbi(jsonAbi);
    setFunctions({ codeHash, functions });


    const functionsTransform =  functions.isAbiSupported
      ? Object.keys(
          functionsType === 'read'
            ? functions.readFunctions || {}
            : functions.writeFunctions || {},
        )
      : records[codeHash].functions || [];

    console.log(functionsTransform);
    return functionsTransform;
  } catch (e) {
    console.log(e);
    setContractHash(null);
  }
});
