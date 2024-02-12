import { getOnceAccounts } from './effects/getOnceAccounts.ts';
import { addTestAccounts } from './effects/addTestAccounts.ts';
import { getAccountsIds } from './effects/getAccountsIds';
import { getContractMethods } from './effects/getContractMethods.ts';
import { setAccounts } from './actions/setAccounts.ts';
import { onMountAccount } from './effects/onMountAccount.ts';
import { setAccountChainDetails } from './actions/setAccountChainDetails.ts';

export const accounts = {
  ids: [],
  records: {},
  // actions
  setAccounts,
  setAccountChainDetails,
  // effects
  getOnceAccounts,
  onMountAccount,
  addTestAccounts,
  getAccountsIds,
  getContractMethods,
};
