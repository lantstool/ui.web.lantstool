import { setAll } from './actions/setAll.js';
import { getAll } from './effects/getAll.js';
import { create } from './effects/create.js';
import { remove } from './effects/remove.js';

export const spaces = {
  // state
  list: [],
  // actions
  setAll,
  // effects
  create,
  getAll,
  remove,
};
