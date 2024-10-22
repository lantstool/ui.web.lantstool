import { action } from '@react-vault';

export const pushOneToList = action(({ slice, payload: call }) => {
  slice.list.push(call);
});
