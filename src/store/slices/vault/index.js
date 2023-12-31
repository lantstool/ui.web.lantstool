import { initState } from './initState';
import { actions } from './actions/index';
import { effects } from './effects/index';

export const vault = {
  ...initState,
  ...actions,
  ...effects,
};
