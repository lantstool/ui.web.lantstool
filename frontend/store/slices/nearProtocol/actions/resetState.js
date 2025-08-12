import { action } from '@react-vault';

export const resetState = action(({ slice }) => {
  slice.isSidebarMinimized = false;
  slice.transactionsSidebarSize = 250; //Default value
  slice.callsSidebarSize = 250; //Default value
});
