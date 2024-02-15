import { initState } from './initState.ts';
import { effects } from './effects';
import { actions } from './actions';

export const keys = {
  ...initState,
  ...effects,
  ...actions,
};
