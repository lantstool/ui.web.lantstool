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

export const appendAction = {
  createAccount,
  transfer,
  addKey,
};
