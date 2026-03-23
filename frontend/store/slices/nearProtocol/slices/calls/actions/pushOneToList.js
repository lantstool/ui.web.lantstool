import { action } from '@react-vault';

export const pushOneToList = action(({ slice, payload }) => {
  const { callId, name, parentId, order } = payload;

  slice.list.push({ callId, name, parentId, order });
});
