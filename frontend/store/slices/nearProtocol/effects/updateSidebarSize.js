import { effect } from '@react-vault';

export const updateSidebarSize = effect(async ({ store, slice, payload }) => {
  const { type, size } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const editSidebarSize = slice.getActions((slice) => slice.editSidebarSize);

  try {
    const appSettings = await backend.sendRequest('settings.getValue', { key: 'appSettings' });

    await backend.sendRequest('settings.setValue', {
      key: 'appSettings',
      value: {
        ...appSettings,
        [type]: size,
      },
    });

    editSidebarSize({ type, size });
  } catch (e) {
    console.log(e);
  }
});
