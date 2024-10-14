import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const transactions = {
  // state
  txList: [],
  txMap: {},
  transaction: null,
  drafts: {},
  results: {},
  // actions
  ...actions,
  // effects
  ...effects,
};
