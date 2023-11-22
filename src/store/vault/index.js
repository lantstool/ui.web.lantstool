import { initState } from './initState.js';
import { action } from '../../react-vault/store/actions/action.js';
import { actions } from './actions/';
import { effects } from './effects/';

export const vault = {
  ...initState,
  ...actions,
  ...effects,
  setActiveAccount: action(({ slice, payload }) => {
    slice.active = payload;
  }),
};
