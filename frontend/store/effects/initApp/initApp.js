import { effect } from '@react-vault';
import { validateUrlParams } from './validateUrlParams.js';

export const initApp = effect(async ({ store, payload }) => {
  const { navigate, params } = payload;
  const [, createBackend] = store.getEntities((store) => store.backend);
  const [, createHistory] = store.getEntities((store) => store.history);
  const [, createTabMessenger] = store.getEntities((store) => store.tabMessenger);
  const [, createNearProtocolRpcProvider] = store.getEntities(
    (store) => store.nearProtocol.rpcProvider,
  );

  const backend = await createBackend();
  createTabMessenger({ navigate });
  createHistory();
  createNearProtocolRpcProvider();

  await validateUrlParams(backend, navigate, params);
});
