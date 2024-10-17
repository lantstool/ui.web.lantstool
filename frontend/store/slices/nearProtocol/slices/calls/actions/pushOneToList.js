import { action } from '../../../../../../../react-vault/index.js';

export const pushOneToList = action(({ slice, payload: call }) => {
  slice.list.push(call);
});
