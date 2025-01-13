import { transactionConfig } from '../../../../_general/transactionConfig.js';

const createAccount = (append) => append({ type: 'CreateAccount', subAccountId: '' });

const transfer = (append) =>
  append({
    type: 'Transfer',
    quantity: { amount: '', unit: transactionConfig.nearUnits.NEAR },
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
        unit: transactionConfig.nearUnits.NEAR,
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
    gas: { amount: '50', unit: transactionConfig.gasUnits.TGas },
    deposit: { amount: '0', unit: transactionConfig.nearUnits.NEAR },
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
