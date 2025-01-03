const createAccount = (append) =>
  append({
    name: 'Create Account',
    type: 'CreateAccount',
    accountId: null,
  });

const transfer = (append) =>
  append({
    name: 'Transfer',
    type: 'Transfer',
    amount: null,
    amountType: { value: 'NEAR', label: 'NEAR' },
  });

const addKey = (append) =>
  append({
    name: 'Add Key',
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
    name: 'Function Call',
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
    name: 'Deploy Contract',
    fileName: null,
  });

const deleteKey = (append) =>
  append({
    name: 'Delete Key',
    type: 'DeleteKey',
    accessKey: null,
  });

const deleteAccount = (append) =>
  append({
    name: 'Delete Account',
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
