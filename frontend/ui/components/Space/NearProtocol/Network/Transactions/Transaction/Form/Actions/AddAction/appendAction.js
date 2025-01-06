const createAccount = (append) => append({ type: 'CreateAccount', subAccountId: null });

const NEAR = { value: 'NEAR', label: 'NEAR' };
const TGas = { value: 'tGas', label: 'TGas' };

const transfer = (append) =>
  append({
    type: 'Transfer',
    quantity: { amount: null, unit: NEAR },
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
