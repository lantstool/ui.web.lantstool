const createAccount = (append) => append({ type: 'CreateAccount', subAccountId: '' });

const NEAR = { value: 'NEAR', label: 'NEAR' };
const TGas = { value: 'TGas', label: 'TGas' };

const transfer = (append) =>
  append({
    type: 'Transfer',
    quantity: { amount: '', unit: NEAR },
  });

const addKey = (append) =>
  append({
    type: 'AddKey',
    publicKey: null,
    permission: 'FullAccess', // FunctionCall
    restrictions: {
      contractId: null,
      allowance: {
        isUnlimited: true,
        amount: '0.25',
        unit: NEAR,
      },
      methods: {
        onlyCertain: false,
        list: [{ methodName: null }],
      },
    },
  });

const functionCall = (append) =>
  append({
    type: 'FunctionCall',
    contractId: null,
    methodName: null,
    args: '',
    gas: { amount: '50', unit: TGas },
    deposit: { amount: '0', unit: NEAR },
  });

const deployContract = (append) => append({ type: 'DeployContract', fileName: '' });
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
