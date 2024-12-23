import { action } from '@react-vault';

export const setAppSettings = action(({ store, payload }) => {
  store.nearProtocol.isSidebarMinimized = payload.isSidebarMinimized;
});
