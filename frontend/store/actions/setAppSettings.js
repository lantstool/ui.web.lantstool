import { action } from '@react-vault';

export const setAppSettings = action(({ store, payload }) => {
  store.nearProtocol.isSidebarMinimized = payload.isSidebarMinimized;
  store.nearProtocol.transactionsSidebarSize = payload.transactionsSidebarSize;
  store.nearProtocol.callsSidebarSize = payload.callsSidebarSize;
});
