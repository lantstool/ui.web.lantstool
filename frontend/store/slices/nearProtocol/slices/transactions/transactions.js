import { actions } from './actions/actions.js';
import { effects } from './effects/effects.js';

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
