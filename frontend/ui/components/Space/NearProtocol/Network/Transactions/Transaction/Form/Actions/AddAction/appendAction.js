const createAccount = (append) =>
  append({
    name: 'Create account',
    type: 'CreateAccount',
    accountId: null,
  });

const transfer = (append) =>
  append({
    name: 'Transfer funds',
    type: 'Transfer',
    amount: null,
    amountType: { value: 'NEAR', label: 'NEAR' },
  });

const addKey = (append) =>
  append({
    name: 'Add key',
    type: 'AddKey',
    publicKey: null,
    permission: {
      type: 'FullAccess', // FullAccess
      restrictions: {
        allowedAllowance: 'Unlimited', // Limited
        allowance: '',
        allowanceType: { value: 'NEAR', label: 'NEAR' },
        receiverId: null,
        allowedMethods: 'All', // Certain
        methodNames: [{ name: null }],
      },
    },
    nonce: '0',
  });

const functionCall = (append) =>
  append({
    name: 'Function call',
    type: 'FunctionCall',
    contractId: '',
    methodName: '',
    arguments: '{}',
    gas: '50',
    deposit: '0',
    gasType: { value: 'tGas', label: 'TGas' },
    depositType: { value: 'NEAR', label: 'NEAR' },
  });

const deployContract = (append) =>
  append({
    type: 'DeployContract',
    name: 'Deploy contract',
    file: null,
  });

const deleteKey = (append) =>
  append({
    name: 'Delete key',
    type: 'DeleteKey',
    accessKey: null,
  });

const deleteAccount = (append) =>
  append({
    name: 'Delete account',
    type: 'DeleteAccount',
    beneficiaryId: null,
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
