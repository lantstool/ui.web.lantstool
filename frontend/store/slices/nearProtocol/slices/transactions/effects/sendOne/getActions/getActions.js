import { createAccount } from './createAccount.js';
import { addKey } from './addKey.js';
import { transfer } from './transfer.js';
import { functionCall } from './functionCall.js';
import { deployContract } from './deployContract.js';
import { deleteKey } from './deleteKey.js';
import { deleteAccount } from './deleteAccount.js';

export const getActions = async (actions, backend) =>
  Promise.all(
    actions.map(async (action) => {
      if (action.type === 'CreateAccount') return createAccount();
      if (action.type === 'AddKey') return addKey(action);
      if (action.type === 'Transfer') return transfer(action);
      if (action.type === 'FunctionCall') return functionCall(action);
      if (action.type === 'DeployContract') return deployContract(action, backend);
      if (action.type === 'DeleteKey') return deleteKey(action);
      if (action.type === 'DeleteAccount') return deleteAccount(action);
    }),
  );
