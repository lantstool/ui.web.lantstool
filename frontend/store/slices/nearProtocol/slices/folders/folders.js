import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const folders = {
  // state
  records: [],
  // actions
  ...actions,
  // effects
  ...effects,
};