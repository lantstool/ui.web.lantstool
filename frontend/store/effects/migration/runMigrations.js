import { effect } from '@react-vault';

export const runMigrations = effect(async ({ store, payload }) => {
  const { navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [tabMessenger] = store.getEntities((store) => store.tabMessenger);
  const [history] = store.getEntities((store) => store.history);
  const resetAppState = store.getEffects((store) => store.resetAppState);
  const setNotification = store.getActions((store) => store.setNotification);
  const checkMigrations = store.getEffects((store) => store.checkMigrations);

  try {
    tabMessenger.beforeMigration();
    await backend.sendRequest('db.runMigrations');

    setTimeout(async () => {
      history.reset();
      resetAppState();
      navigate('/');
      tabMessenger.afterMigration();

      //Check migration after restore backup
     await checkMigrations()

      setNotification({ isOpen: true, message: 'Migration complete', variant: 'success' });
    }, 25);
  } catch (e) {
    console.log(e);
  }
});
