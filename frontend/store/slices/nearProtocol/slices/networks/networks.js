import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const networks = {
  ids: [],
  records: {},
  network: null,
  ...actions,
  ...effects,
};
