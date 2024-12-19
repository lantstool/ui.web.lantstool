import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const calls = {
  // state
  list: [],
  drafts: {},
  results: {},
  // actions
  ...actions,
  // effects
  ...effects,
};
