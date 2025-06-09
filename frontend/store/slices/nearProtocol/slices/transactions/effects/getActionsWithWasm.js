import { effect } from '@react-vault';
import { DeployContract } from './exportOne/helpers/deployContract.js';

const transformActions = (actions, store) =>
  Promise.all(
    actions.map((action) =>
      action.type === 'DeployContract' ? DeployContract(action, store) : action,
    ),
  );

const groupActions = (grouped, hasCreateAccount) => {
  const result = [];
  let currentGroup = { contractWasm: null, functionCalls: [] };

  grouped.forEach((action, index) => {
    if (action.type === 'DeployContract') {
      if (currentGroup.contractWasm || currentGroup.functionCalls.length) {
        result.push(currentGroup);
      }
      currentGroup = { contractWasm: action?.base64File, functionCalls: [] };
    } else if (action.type === 'FunctionCall') {
      if (currentGroup.contractWasm === null) {
        currentGroup.contractWasm = hasCreateAccount ? null : 'accountContract';
      }
      currentGroup.functionCalls.push({ ...action, indexInActions: index });
    }
  });

  if (currentGroup.contractWasm || currentGroup.functionCalls.length) {
    result.push(currentGroup);
  }

  return result;
};

const findDeployForOrder = (groupedActions, order) =>
  groupedActions.find((group) => group.functionCalls.some((fc) => fc.indexInActions === order))
    ?.contractWasm || null;

export const getActionsWithWasm = effect(async ({ store, payload }) => {
  const { actions, order } = payload;
  const hasCreateAccount = actions.some((action) => action.type === 'CreateAccount');

  try {
    const transformedActions = await transformActions(actions, store);
    const grouped = groupActions(transformedActions, hasCreateAccount);

    return findDeployForOrder(grouped, order - 1);
  } catch (e) {
    console.error(e);
  }
});
