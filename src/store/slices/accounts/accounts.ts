import { getOnceAccounts } from './effects/getOnceAccounts.ts';
import { addTestAccounts } from './effects/addTestAccounts.ts';
import { getAccountsIds } from './effects/getAccountsIds';
import { getContractMethods } from './effects/getContractMethods.ts';
import { setAccounts } from './actions/setAccounts.ts';
import { onMountAccount } from './effects/onMountAccount.ts';
import { setAccountChainDetails } from './actions/setAccountChainDetails.ts';
import { setAccount } from './actions/setAccount.ts';
import { setContract } from './actions/setContract.ts';
import { addAccount } from './effects/addAccount.ts';
import { removeAccount } from './actions/removeAccount.ts';
import { deleteAccount } from './effects/deleteAccount.ts';
import { updateContract } from './effects/updateContract.ts';

export const accounts = {
  ids: [],
  records: {},
  // actions
  setAccount,
  removeAccount,
  setAccounts,
  setAccountChainDetails,
  setContract,
  // effects
  getOnceAccounts,
  onMountAccount,
  addTestAccounts,
  getAccountsIds,
  getContractMethods,
  addAccount,
  deleteAccount,
  addContract: updateContract,
};
