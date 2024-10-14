import { actions } from './actions/index.js';
import { getAll } from './effects/getAll.js';
import { create } from './effects/create.js';
import { getCount } from './effects/getCount.js';
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
  getCount,
  remove,
};
