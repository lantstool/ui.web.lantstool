import { getAll } from './effects/getAll.js';
import { getIds } from './effects/getIds.js';
import { setAccounts } from './actions/setAccounts.js';
import { setKeyList } from './actions/setKeyList.js';
import { setAccountDetails } from './actions/setAccountDetails.js';
import { setAccount } from './actions/setAccount.js';
import { resetState } from './actions/resetState.js';
import { editNote } from './actions/editNote.js';
import { resetAccountDetails } from './actions/resetAccountDetails.js';
import { create } from './effects/create.js';
import { removeAccount } from './actions/removeAccount.js';
import { remove } from './effects/remove.js';
import { getAccountKeys } from './effects/getAccountKeys.js';
import { getAccountDetails } from './effects/getAccountDetails.js';
import { getAccountBalance } from './effects/getAccountBalance.js';
import { updateOneNote } from './effects/updateOneNote.js';

export const accounts = {
  ids: [],
  records: {},
  account: {
    details: {},
    keys: [],
  },
  // actions
  setAccount,
  removeAccount,
  setAccounts,
  setAccountDetails,
  resetState,
  setKeyList,
  resetAccountDetails,
  editNote,
  // effects
  create,
  getAll,
  getIds,
  getAccountDetails,
  remove,
  getAccountKeys,
  getAccountBalance,
  updateOneNote,
};
