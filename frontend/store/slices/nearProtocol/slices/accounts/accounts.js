import { getAll } from './effects/getAll.js';
import { getIds } from './effects/getIds.js';
import { setAccounts } from './actions/setAccounts.js';
import { setKeyList } from './actions/setKeyList.js';
import { onMountAccount } from './effects/onMountAccount.js';
import { setAccountChainDetails } from './actions/setAccountChainDetails.js';
import { setAccount } from './actions/setAccount.js';
import { resetState } from './actions/resetState.js';
import { create } from './effects/create.js';
import { removeAccount } from './actions/removeAccount.js';
import { deleteAccount } from './effects/deleteAccount.js';
import { getKeyList } from './effects/getKeyList.js';

export const accounts = {
  ids: [],
  records: {},
  // actions
  setAccount,
  removeAccount,
  setAccounts,
  setAccountChainDetails,
  resetState,
  setKeyList,
  // effects
  getAll,
  onMountAccount,
  getIds,
  create,
  deleteAccount,
  getKeyList,
};
