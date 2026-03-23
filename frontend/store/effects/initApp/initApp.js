import { effect } from '@react-vault';
import { validateUrlParams } from './validateUrlParams.js';
import { emitStartSession, setupEmitEventsOnVisibilityChange } from './setupAnalyticsEvents.js';

export const initApp = effect(async ({ store, payload }) => {
  const { navigate, params } = payload;
  const setAppSettings = store.getActions((store) => store.setAppSettings);
  const [, createBackend] = store.getEntities((store) => store.backend);
  const [, createHistory] = store.getEntities((store) => store.history);
  const [, createTabMessenger] = store.getEntities((store) => store.tabMessenger);
  const [, createAnalytics] = store.getEntities((store) => store.analytics);
  const [, createNearProtocolRpcProvider] = store.getEntities(
    (store) => store.nearProtocol.rpcProvider,
  );

  // Start app services;
  const backend = await createBackend();
  const analytics = await createAnalytics();

  createTabMessenger({ navigate });
  createHistory();
  createNearProtocolRpcProvider();

  // Fetch global app settings from DB and set to the state;
  const appSettings = await backend.sendRequest('settings.getValue', { key: 'appSettings' });
  setAppSettings(appSettings);

  // Send analytics data about user's session;
  // If he just reloads the page - use specific event type for it.
  await emitStartSession(analytics);
  setupEmitEventsOnVisibilityChange(analytics);

  // We have to validate URL params and if they are invalid - redirect user to 404;
  await validateUrlParams(backend, navigate, params);
});
