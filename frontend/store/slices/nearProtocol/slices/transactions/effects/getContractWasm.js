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


const findWasmForOrder = async (
  actions,
  order,
  getContractAbiObject,
  store,
  setFunctions,
  records,
) => {
  let contractMethods = 'onChainContract';
  let hasCreateAccount = false;

  //Iterate backwards from the current FunctionCall (by order index)
  for (let i = order - 1; i >= 0; i--) {
    const action = actions[i];

    // If a CreateAccount is found before DeployContract, mark it
    if (action.type === 'CreateAccount') {
      hasCreateAccount = true;
    }

    if (action.type === 'DeployContract') {

      const codeHash = action.fileName.replace(/^.*-([A-Za-z0-9]+)\.wasm$/, '$1');
      console.log(records[codeHash]);
      // if (records[codeHash]) return contractMethods= records[codeHash];
      try {
        if (!action.fileName) return (contractMethods = null);
        const contractAbiObject = await getContractAbiObject({ fileName: action.fileName });
        const fnTemplates = await createContractFnArgsTemplates(contractAbiObject);
        console.log(1);
        contractMethods = { isAbiSupported: true, ...fnTemplates };
        // setFunctions({ codeHash, functions: { isAbiSupported: true, ...fnTemplates } });
        break;
      } catch (e) {
        if (!action.fileName) return (contractMethods = null);
        const wasm = await getWasm(action, store);
        console.log(2);
        const arrayBuffer = base64ToArrayBuffer(wasm);
        const exportedFunctions = await getExportedWasmFunctions(arrayBuffer);
        contractMethods = {
          isAbiSupported: false,
          functions: exportedFunctions.map((el) => el.name) || null,
        };
        break;
        // setFunctions({ codeHash, functions: exportedFunctions });
      }
    }
  }

  return hasCreateAccount ? null : contractMethods;
};

// Searching contract WASM from the nearest DeployContract before the FunctionCall
export const getContractWasm = effect(async ({ store, payload }) => {
  const { actions, order } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setFunctions = store.getActions(
    (store) => store.nearProtocol.contractsMethods.setFunctions,
  );
  const records = store.getState((store) => store.nearProtocol.contractsMethods.records);

  try {
    const getContractAbiObject = async (fileName) =>
      await backend.sendRequest('nearProtocol.transactions.getContractAbiObject', fileName);

    return findWasmForOrder(actions, order, getContractAbiObject, store, setFunctions, records);
  } catch (e) {
    console.error(e);
  }
});
