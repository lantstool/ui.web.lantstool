import { effect } from '@react-vault';

export const createBackup = effect(async ({ store }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const [tabMessenger] = store.getEntities((store) => store.tabMessenger);

  try {
    tabMessenger.stopBackend();

    // TODO: Temporary solution! Need to rewrite!
    // We have to send request to all tabs, wait while they will close all DB connections
    // and only after that start to create a backup
    setTimeout(async () => {
      const res = await backend.sendRequest('db.createBackup');
      console.log(res);
      tabMessenger.startBackend();
    }, 25);
  } catch (e) {
    console.log(e);
  }
});
