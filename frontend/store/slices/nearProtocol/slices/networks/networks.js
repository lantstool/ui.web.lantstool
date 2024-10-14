import { create } from './effects/create.js';
import { setToList } from './actions/setToList.js';
import { getAll } from './effects/getAll.js';
import { remove } from './effects/remove.js';
import { removeOneFromList } from './actions/removeOneFromList.js';
import { getActiveRpc } from './effects/getActiveRpc.js';
import { putOneToList } from './actions/putOneToList.js';

export const networks = {
  ids: [],
  records: {},
  network: null,
  // actions
  setToList,
  putOneToList,
  removeOneFromList,
  // effects
  create,
  getAll,
  getActiveRpc,
  remove,
};
