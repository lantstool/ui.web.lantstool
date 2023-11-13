import { action } from '../../react-vault/store/actions/action.js';
import { initState } from './initState.js';
import { actions } from './actions/';
import { effects } from './effects/';

export const transactions = {
  ...initState,
  ...actions,
  ...effects,
  setActiveTransaction: action(({ slice, payload }) => {
    slice.active = payload;
  }),
};
