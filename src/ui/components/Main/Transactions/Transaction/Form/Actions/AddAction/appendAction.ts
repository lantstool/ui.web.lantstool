import { v4 } from 'uuid';

const createAccount = (append: any) =>
  append({
    actionId: v4(),
    name: 'Create Account',
    type: 'CreateAccount',
  });

const transfer = (append: any) =>
  append({
    actionId: v4(),
    name: 'Transfer',
    type: 'Transfer',
    amount: '',
    amountType: 'NEAR',
  });

const addKey = (append: any) =>
  append({
    actionId: v4(),
    name: 'Add Access Key',
    type: 'AddKey',
    publicKey: '',
    permission: {
      type: 'FullAccess', // FullAccess
      restrictions: {
        allowedAllowance: 'Unlimited', // Limited
        allowance: '',
        receiverId: '',
        allowedMethods: 'All', // Certain
        methodNames: [{ name: '' }],
      },
    },
    nonce: '0',
  });

const functionCall = (append: any) =>
  append({
    actionId: v4(),
    name: 'Function Call',
    type: 'FunctionCall',
    methodName: '',
    arguments: '{}',
    gas: '50',
    deposit: '0',
  });

const deployContract = (append: any) =>
  append({
    type: 'DeployContract',
    actionId: v4(),
    name: 'Deploy Contract',
    file: '',
  });

const deleteKey = (append: any) =>
  append({
    actionId: v4(),
    name: 'Delete Key',
    type: 'DeleteKey',
    accessKey: '',
  });

const deleteAccount = (append: any) =>
  append({
    actionId: v4(),
    name: 'Delete Account',
    type: 'DeleteAccount',
    beneficiaryId: '',
  });

export const appendAction = {
  createAccount,
  transfer,
  addKey,
  functionCall,
  deployContract,
  deleteKey,
  deleteAccount,
};
