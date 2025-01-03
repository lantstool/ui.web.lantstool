import { effect } from '@react-vault';

export const updateIsSidebarMinimized = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setIsSidebarMinimized = slice.getActions((slice) => slice.setIsSidebarMinimized);

  try {
    setIsSidebarMinimized(payload);
    await backend.sendRequest('settings.setValue', {
      key: 'appSettings',
      value: {
        isSidebarMinimized: payload,
      },
    });
  } catch (e) {
    console.log(e);
  }
});
