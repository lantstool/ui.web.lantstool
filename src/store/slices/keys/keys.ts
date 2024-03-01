import { addAccount } from './actions/addAccount.ts';
import { removeKey } from './actions/removeKey.ts';
import { setKeysOnce } from './actions/setKeysOnce.ts';
import { addKey } from './effects/addKey.ts';
import { createKey } from './actions/createKey.ts';
import { deleteKey } from './effects/deleteKey.ts';
import { getKey } from './effects/getKey.ts';
import { getKeys } from './effects/getKeys.ts';
import { loadKeysOnce } from "./effects/loadKeysOnce.ts";

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
  //effects
  addKey,
  deleteKey,
  getKey,
  getKeys,
  loadKeysOnce,
};
