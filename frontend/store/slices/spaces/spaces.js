import { setAll } from './actions/setAll.js';
import { getAll } from './effects/getAll.js';
import { createSpace } from './effects/createSpace.js';
import { deleteSpace } from './effects/deleteSpace.js';

export const spaces = {
  // state
  list: [],
  // actions
  setAll,
  // effects
  getAll,
  createSpace,
  deleteSpace,
};
