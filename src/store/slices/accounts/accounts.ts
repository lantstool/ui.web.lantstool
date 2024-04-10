import { getOnceAccounts } from './effects/getOnceAccounts.ts';
import { getAccountsIds } from './effects/getAccountsIds';
import { setAccounts } from './actions/setAccounts.ts';
import { setKeyList } from './actions/setKeyList.ts';
import { onMountAccount } from './effects/onMountAccount.ts';
import { setAccountChainDetails } from './actions/setAccountChainDetails.ts';
import { setAccount } from './actions/setAccount.ts';
import { resetState } from './actions/resetState.ts';
import { addAccount } from './effects/addAccount.ts';
import { removeAccount } from './actions/removeAccount.ts';
import { deleteAccount } from './effects/deleteAccount.ts';
import { getKeyList } from './effects/getKeyList.ts';

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
