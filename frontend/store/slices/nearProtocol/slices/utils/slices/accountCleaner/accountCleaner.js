import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const accountCleaner = {
  fix: 'this bug', // TODO - fix bug: when we have an empty init state we can't set any property to the slice
  ...actions,
  ...effects,
};
