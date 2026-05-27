import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const transactions = {
  // state
  txList: [],
  drafts: {},
  results: {},
  scrollPositions: {},
  // actions
  ...actions,
  // effects
  ...effects,
};
