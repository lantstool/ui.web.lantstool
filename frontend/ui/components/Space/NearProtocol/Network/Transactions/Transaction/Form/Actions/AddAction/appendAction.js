const createAccount = (append) => append({ type: 'CreateAccount', subAccountId: null });

const transfer = (append) =>
  append({
    type: 'Transfer',
    amount: null,
    amountType: { value: 'NEAR', label: 'NEAR' },
  });

const addKey = (append) =>
  append({
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
    type: 'FunctionCall',
    contractId: null,
    method: null,
    args: '',
    gas: '50',
    deposit: '0',
    gasType: { value: 'tGas', label: 'TGas' },
    depositType: { value: 'NEAR', label: 'NEAR' },
  });

const deployContract = (append) => append({ type: 'DeployContract', fileName: null });
const deleteKey = (append) => append({ type: 'DeleteKey', publicKey: null });
const deleteAccount = (append) => append({ type: 'DeleteAccount', beneficiaryId: null });

export const appendAction = {
  createAccount,
  transfer,
  addKey,
  functionCall,
  deployContract,
  deleteKey,
  deleteAccount,
};
