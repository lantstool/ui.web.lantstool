import { action } from '@react-vault';

export const pushOneToList = action(({ slice, payload: folder }) => {
  slice.records.push({ ...folder, collapsed: folder.collapsed === 1 });
});
