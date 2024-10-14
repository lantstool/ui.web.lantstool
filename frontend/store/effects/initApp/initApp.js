import { effect } from '../../../../react-vault/index.js';
import { validateUrlParams } from './validateUrlParams.js';

export const initApp = effect(async ({ store, payload }) => {
  const { navigate, params } = payload;
  const [, createBackend] = store.getEntities((store) => store.backend);
  const [, createHistory] = store.getEntities((store) => store.history);

  const backend = await createBackend();
  createHistory();

  await validateUrlParams(backend, navigate, params);
});
