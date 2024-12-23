import { action } from '@react-vault';

export const setIsSidebarMinimized = action(({ slice, payload }) => {
  slice.isSidebarMinimized = payload;
});
