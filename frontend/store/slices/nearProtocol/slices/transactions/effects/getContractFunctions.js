import { effect } from '@react-vault';
import { base64ToArrayBuffer } from '../../../../../helpers/base64ToArrayBuffer.js';
import { getExportedWasmFunctions } from '../../../../../helpers/getExportedWasmFunctions.js';
import { createContractFnArgsTemplates } from '../../contractsMethods/helpers/createContractFnArgsTemplates/createContractFnArgsTemplates.js';
import { toBase64 } from '../../../../../helpers/toBase64.js';

const getWasm = async (formAction, store) => {
  if (!formAction.fileName) return '';

  const [backend] = store.getEntities((store) => store.backend);

  try {
    const u8Contract = await backend.sendRequest('nearProtocol.transactions.getU8Contract', {
      fileName: formAction.fileName,
    });

    return toBase64(u8Contract);
  } catch (e) {
    console.log(e);
    return '';
  }
};

const loadFunctionsFromAbi = async (fileName, codeHash, getContractAbiObject, setFunctions) => {
  try {
    const abiObject = await getContractAbiObject({ fileName });
    const fnTemplates = await createContractFnArgsTemplates(abiObject);
    const functions = { isAbiSupported: true, ...fnTemplates };

    setFunctions({ codeHash, functions });
    return functions;
  } catch (e) {
    console.log(e);
  }
};

const loadFunctionsFromWasm = async (fileName, codeHash, store, setFunctions) => {
  try {
    const wasm= await getWasm({ fileName }, store);
    const buffer = base64ToArrayBuffer(wasm);
    const exportedFunctions = await getExportedWasmFunctions(buffer);
    const functions = {
      isAbiSupported: false,
      functions: exportedFunctions.map((f) => f.name),
    };

    setFunctions({ codeHash, functions });
    return functions;
  } catch (e) {
    console.log(e);
  }
};

const findFunctionsForOrder = async (
  actions,
  order,
  getContractAbiObject,
  store,
  setFunctions,
  records,
  contractFunctions,
) => {
  const hasCreateAccount = actions.find((action) => action.type === 'CreateAccount');
  //Iterate backwards from the current FunctionCall (by order index)
  for (let i = order - 1; i >= 0; i--) {
    const action = actions[i];

    if (action.type !== 'DeployContract') continue;

    if (!action.fileName) return null;

    //Extract codeHash from fileName
    const codeHash = action.fileName.replace(/^.*-([A-Za-z0-9]+)\.wasm$/, '$1');
    if (!codeHash) return null;

    // If we already has the contract methods with this hash in the state - use cached value
    if (records[codeHash]) return records[codeHash];

    // Try to extract functions args from ABI
    const abiFunctions = await loadFunctionsFromAbi(
      action.fileName,
      codeHash,
      getContractAbiObject,
      setFunctions,
    );
    if (abiFunctions) return abiFunctions;

    // Try to extract functions args from WASM
    const wasmFunctions = await loadFunctionsFromWasm(
      action.fileName,
      codeHash,
      store,
      setFunctions,
    );
    if (wasmFunctions) return wasmFunctions;
  }
  //If we haven't functions return null or preloaded contractFunctions from chain
  return hasCreateAccount ? null : contractFunctions;
};

// Searching contract WASM from the nearest DeployContract before the FunctionCall
export const getContractFunctions = effect(async ({ store, payload }) => {
  const { actions, order, contractFunctions } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setFunctions = store.getActions(
    (store) => store.nearProtocol.contractsMethods.setFunctions,
  );
  const records = store.getState((store) => store.nearProtocol.contractsMethods.records);

  try {
    const getContractAbiObject = async (fileName) =>
      await backend.sendRequest('nearProtocol.transactions.getContractAbiObject', fileName);

    return findFunctionsForOrder(
      actions,
      order,
      getContractAbiObject,
      store,
      setFunctions,
      records,
      contractFunctions,
    );
  } catch (e) {
    console.error(e);
  }
});
