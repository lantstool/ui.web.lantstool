import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const calls = {
  // state
  list: [],
  call: null,
  drafts: {},
  results: {},
  // actions
  ...actions,
  // effects
  ...effects,
};
