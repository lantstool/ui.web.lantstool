import { effect } from '@react-vault';

export const restoreFromBackup = effect(async ({ store, payload }) => {
  const { navigate, file } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const [tabMessenger] = store.getEntities((store) => store.tabMessenger);
  const resetAppState = store.getEffects((store) => store.resetAppState);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    tabMessenger.beforeRestoreFromBackup();
    await backend.sendRequest('db.restoreFromBackup', { backup: file });

    // TODO TEMPORARY SOLUTION!
    setTimeout(async () => {
      history.reset();
      resetAppState();
      navigate('/');
      tabMessenger.afterRestoreFromBackup();
      setNotification({ isOpen: true, message: 'Backup Restored', variant: 'success' });
    }, 25);
  } catch (e) {
    console.log(e);
    setNotification({
      isOpen: true,
      message: e.code === 500 ? 'Backup Restoration Failed' : e.message,
      variant: 'error',
      delay: 5000,
    });
  }
});
