import { initState } from './initState.js';
import { action } from '../../react-vault/store/actions/action.js';

export const vault = {
  ...initState,
  setActiveAccount: action(({ slice, payload }) => {
    slice.active = payload;
  }),
};
