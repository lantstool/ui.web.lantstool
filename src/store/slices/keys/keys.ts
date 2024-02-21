import { addAccount } from './actions/addAccount.ts';
import { removeKey } from './actions/removeKey.ts';
import { setKeys } from './actions/setKeys.ts';
import { addKey } from './effects/addKey.ts';
import { createKey } from './actions/createKey.ts';
import { deleteKey } from './effects/deleteKey.ts';
import { getKey } from './effects/getKey.ts';
import { getKeys } from './effects/getKeys.ts';

export const keys = {
  ids: [],
  records: {},
  // actions
  addAccount,
  removeKey,
  createKey,
  setKeys,
  //effects
  addKey,
  deleteKey,
  getKey,
  getKeys,
};
