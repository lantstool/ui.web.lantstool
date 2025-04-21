import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const utils = {
  // init state
  keyGenerator: {},
  unitConverter: {},
  accountCleaner: {},
  ...actions,
  ...effects,
};
