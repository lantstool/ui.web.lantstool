import { action } from '@react-vault';

export const editSidebarSize = action(({ slice, payload }) => {
  const {type, size} = payload

  slice[type] = size;
});
