import { addAccount } from './actions/addAccount.js';
import { removeKey } from './actions/removeKey.js';
import { setKeysOnce } from './actions/setKeysOnce.js';
import { addKey } from './effects/addKey.js';
import { createKey } from './actions/createKey.js';
import { resetState } from './actions/resetState.js';
import { deleteKey } from './effects/deleteKey.js';
import { getKey } from './effects/getKey.js';
import { getKeys } from './effects/getKeys.js';
import { loadKeysOnce } from './effects/loadKeysOnce.js';

export const keys = {
  // init state
  isKeysLoadedToState: false,
  ids: [],
  records: {},
  // actions
  addAccount,
  removeKey,
  createKey,
  setKeysOnce,
  resetState,
  //effects
  addKey,
  deleteKey,
  getKey,
  getKeys,
  loadKeysOnce,
};
