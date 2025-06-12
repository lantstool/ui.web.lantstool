import { effect } from '@react-vault';
import { DeployContract } from './exportOne/helpers/deployContract.js';

const transformActions = (actions, store) =>
  Promise.all(
    actions.map((action) =>
      action.type === 'DeployContract' ? DeployContract(action, store) : action,
    ),
  );

const findWasmForOrder = (actions, order) => {
  let contractWasm = 'onChainContract';
  let hasCreateAccount = false;

  //Iterate backwards from the current FunctionCall (by order index)
  for (let i = order - 1; i >= 0; i--) {
    const action = actions[i];

    // If a CreateAccount is found before DeployContract, mark it
    if (action.type === 'CreateAccount') {
      hasCreateAccount = true;
    }

    if (action.type === 'DeployContract') {
      contractWasm = action.base64File || null;
      break;
    }
  }

  return hasCreateAccount ? null : contractWasm;
};

// Searching contract WASM from the nearest DeployContract before the FunctionCall
export const getContractWasm = effect(async ({ store, payload }) => {
  const { actions, order } = payload;

  try {
    const transformedActions = await transformActions(actions, store);

    return findWasmForOrder(transformedActions, order);
  } catch (e) {
    console.error(e);
  }
});
