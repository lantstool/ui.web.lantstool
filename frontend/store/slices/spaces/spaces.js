import { actions } from './actions/index.js';
import { getAll } from './effects/getAll.js';
import { create } from './effects/create.js';
import { remove } from './effects/remove.js';

export const spaces = {
  // state
  ids: [],
  records: {},
  // actions
  ...actions,
  // effects
  create,
  getAll,
  remove,
};
