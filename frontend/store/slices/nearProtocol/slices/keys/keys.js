import { setKeyList } from './actions/setKeyList.js';
import { addKeyToList } from './actions/addKeyToList.js';
import { deleteKey } from './actions/deleteKey.js';
import { importFromPrivateKey } from './effects/importFromPrivateKey.js';
import { importFromSeedPhrase } from './effects/importFromSeedPhrase.js';
import { getKeyList } from './effects/getKeyList.js';
import { getKey } from './effects/getKey.js';
import { removeKey } from './effects/removeKey.js';

export const keys = {
  //state
  ids: [],
  records: {},
  // actions
  setKeyList,
  addKeyToList,
  deleteKey,
  //effects
  importFromPrivateKey,
  importFromSeedPhrase,
  getKeyList,
  getKey,
  removeKey,
};
