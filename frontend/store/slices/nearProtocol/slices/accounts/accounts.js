import { getOnceAccounts } from './effects/getOnceAccounts.js';
import { getAccountsIds } from './effects/getAccountsIds.js';
import { setAccounts } from './actions/setAccounts.js';
import { setKeyList } from './actions/setKeyList.js';
import { onMountAccount } from './effects/onMountAccount.js';
import { setAccountChainDetails } from './actions/setAccountChainDetails.js';
import { setAccount } from './actions/setAccount.js';
import { resetState } from './actions/resetState.js';
import { addAccount } from './effects/addAccount.js';
import { removeAccount } from './actions/removeAccount.js';
import { deleteAccount } from './effects/deleteAccount.js';
import { getKeyList } from './effects/getKeyList.js';

export const accounts = {
  ids: [],
  records: {},
  isAccountsLoadedToState: false,
  // actions
  setAccount,
  removeAccount,
  setAccounts,
  setAccountChainDetails,
  resetState,
  setKeyList,
  // effects
  getOnceAccounts,
  onMountAccount,
  getAccountsIds,
  addAccount,
  deleteAccount,
  getKeyList,
};
