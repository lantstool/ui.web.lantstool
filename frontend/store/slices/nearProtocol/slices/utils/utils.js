import { actions } from './actions/index.js';
import { effects } from './effects/index.js';
import { accountCleaner } from './slices/accountCleaner/accountCleaner.js';

export const utils = {
  // init state
  keyGenerator: {},
  unitConverter: {},
  ...actions,
  ...effects,
  // slices
  accountCleaner,
};
