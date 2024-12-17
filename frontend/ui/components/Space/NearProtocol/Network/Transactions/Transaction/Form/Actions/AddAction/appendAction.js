const createAccount = (append) =>
  append({
    name: 'Create account',
    type: 'CreateAccount',
    accountId: '',
  });

const transfer = (append) =>
  append({
    name: 'Transfer funds',
    type: 'Transfer',
    amount: '',
    amountType: { value: 'NEAR', label: 'NEAR' },
  });

const addKey = (append) =>
  append({
    name: 'Add key',
    type: 'AddKey',
    publicKey: '',
    permission: {
      type: 'FullAccess', // FullAccess
      restrictions: {
        allowedAllowance: 'Unlimited', // Limited
        allowance: '',
        allowanceType: { value: 'NEAR', label: 'NEAR' },
        receiverId: { value: '', label: '' },
        allowedMethods: 'All', // Certain
        methodNames: [{ name: { value: '', label: '' } }],
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
    file: '',
  });

const deleteKey = (append) =>
  append({
    name: 'Delete key',
    type: 'DeleteKey',
    accessKey: { value: '', label: '' },
  });

const deleteAccount = (append) =>
  append({
    name: 'Delete account',
    type: 'DeleteAccount',
    beneficiaryId: { value: '', label: '' },
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
