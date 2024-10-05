import { setKeyList } from './actions/setKeyList.js';
import { addKeyToList } from './actions/addKeyToList.js';
import { importFromPrivateKey } from './effects/importFromPrivateKey.js';
import { importFromSeedPhrase } from './effects/importFromSeedPhrase.js';
import { deleteKey } from './effects/deleteKey.js';
import { getKeyList } from './effects/getKeyList.js';

export const keys = {
  //state
  ids: [],
  records: {},
  // actions
  setKeyList,
  addKeyToList,
  //effects
  importFromPrivateKey,
  importFromSeedPhrase,
  deleteKey,
  getKeyList,
};
