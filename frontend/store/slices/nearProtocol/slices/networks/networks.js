import { create } from './effects/create.js';
import { setToList } from './actions/setToList.js';
import { getAll } from './effects/getAll.js';
import { remove } from './effects/remove.js';
import { removeOneFromList } from './actions/removeOneFromList.js';
import { getActiveRpc } from './effects/getActiveRpc.js';
import { putOneToList } from './actions/putOneToList.js';
import { resetState } from './actions/resetState.js';

export const networks = {
  ids: [],
  records: {},
  network: null,
  // actions
  setToList,
  putOneToList,
  removeOneFromList,
  resetState,
  // effects
  create,
  getAll,
  getActiveRpc,
  remove,
};
