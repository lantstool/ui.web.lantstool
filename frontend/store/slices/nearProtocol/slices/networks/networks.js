import { createManually } from './effects/createManually.js';
import { setToList } from './actions/setToList.js';
import { getAll } from './effects/getAll.js';
import { remove } from './effects/remove.js';
import { removeOneFromList } from './actions/removeOneFromList.js';
import { putOneToList } from './actions/putOneToList.js';
import { resetState } from './actions/resetState.js';
import { createFromPreset } from './effects/createFromPreset.js';

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
  createManually,
  createFromPreset,
  getAll,
  remove,
};
