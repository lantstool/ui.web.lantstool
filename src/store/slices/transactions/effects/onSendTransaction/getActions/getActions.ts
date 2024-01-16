import { createAccount } from './createAccount.ts';
import { addKey } from './addKey.ts';
import { transfer } from './transfer.ts';
import { functionCall } from './functionCall.ts';
import { deployContract } from './deployContract.ts';
import { deleteKey } from './deleteKey.ts';

export const getActions = async (actions: any) =>
  Promise.all(
    actions.map(async (action: any) => {
      if (action.type === 'CreateAccount') return createAccount();
      if (action.type === 'AddKey') return addKey(action);
      if (action.type === 'Transfer') return transfer(action);
      if (action.type === 'FunctionCall') return functionCall(action);
      if (action.type === 'DeployContract') return deployContract(action);
      if (action.type === 'DeleteKey') return deleteKey(action);
    }),
  );
