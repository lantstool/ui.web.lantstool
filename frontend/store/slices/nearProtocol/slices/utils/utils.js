import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const utils = {
  keyGenerator: {},
  unitConverter: {},
  ...actions,
  ...effects,
};
