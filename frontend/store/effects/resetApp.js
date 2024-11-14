import { effect } from '@react-vault';

export const resetApp = effect(async ({ store, payload }) => {
  const { navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const [tabMessenger] = store.getEntities((store) => store.tabMessenger);
  const resetAppState = store.getEffects((store) => store.resetAppState);

  try {
    tabMessenger.beforeResetApp();
    // TODO: Temporary solution! Need to rewrite!
    // We have to send request to all tabs, wait while they will close all DB connections
    // and only after that start to remove db files

    // Sometimes we get an error when we are trying to delete OPFS files.
    // To avoid this we use this delay
    setTimeout(async () => {
      await backend.sendRequest('db.reset');
      history.reset();
      resetAppState();
      tabMessenger.afterResetApp();
      navigate('/get-started');
    }, 25);
  } catch (e) {
    console.log(e);
  }
});
