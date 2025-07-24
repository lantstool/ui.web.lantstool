import { effect } from '@react-vault';

export const updateSidebarSize = effect(async ({ store, payload }) => {
  const { type, size } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const appSettings = await backend.sendRequest('settings.getValue', { key: 'appSettings' });

    await backend.sendRequest('settings.setValue', {
      key: 'appSettings',
      value: {
        ...appSettings,
        [type]: size,
      },
    });
  } catch (e) {
    console.log(e);
  }
});
