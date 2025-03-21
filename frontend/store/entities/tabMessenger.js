import { entity } from '@react-vault';

const stopBackend = async (store) => {
  const [backend] = store.getEntities((store) => store.backend);
  await backend.stop();
};

const startBackend = async (store) => {
  const [backend] = store.getEntities((store) => store.backend);
  await backend.start();
};

// We use these 2 hooks in case the user has a few opened tabs and starting
// the reset app process - we have to handle this and restart the backend on every tab
const beforeResetApp = (store) => stopBackend(store);

const afterResetApp = async (store, navigate) => {
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const resetAppState = store.getEffects((store) => store.resetAppState);

  try {
    await backend.start();
    history.reset();
    resetAppState();
    navigate('/');
  } catch (e) {
    console.log(e);
  }
};

const afterRestoreFromBackup = async (store, navigate) => {
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const resetAppState = store.getEffects((store) => store.resetAppState);

  try {
    await backend.start();
    history.reset();
    resetAppState();
    navigate('/');
  } catch (e) {
    console.log(e);
  }
};

const createTabMessenger = (store, navigate) => {
  const channel = new BroadcastChannel('tabMessenger');

  channel.onmessage = (event) => {
    if (event.data.event === 'stopBackend') stopBackend(store);
    if (event.data.event === 'startBackend') startBackend(store);
    if (event.data.event === 'beforeResetApp') beforeResetApp(store);
    if (event.data.event === 'afterResetApp') afterResetApp(store, navigate);
    if (event.data.event === 'beforeRestoreFromBackup') stopBackend(store);
    if (event.data.event === 'afterRestoreFromBackup') afterRestoreFromBackup(store, navigate);
  };

  // Don't sure if we need this at all
  window.addEventListener('beforeunload', () => {
    channel.close();
  });

  return {
    stopBackend: () => channel.postMessage({ event: 'stopBackend' }),
    startBackend: () => channel.postMessage({ event: 'startBackend' }),
    beforeResetApp: () => channel.postMessage({ event: 'beforeResetApp' }),
    afterResetApp: () => channel.postMessage({ event: 'afterResetApp' }),
    beforeRestoreFromBackup: () => channel.postMessage({ event: 'beforeRestoreFromBackup' }),
    afterRestoreFromBackup: () => channel.postMessage({ event: 'afterRestoreFromBackup' }),
  };
};

export const tabMessenger = entity(({ store, payload }) => {
  const { navigate } = payload;
  return createTabMessenger(store, navigate);
});
