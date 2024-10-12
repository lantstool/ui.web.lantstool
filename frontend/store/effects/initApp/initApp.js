import { effect } from '../../../../react-vault/index.js';
import { validateUrlParams } from './validateUrlParams.js';

export const initApp = effect(async ({ store, payload }) => {
  const { navigate, params } = payload;
  const [_, createBackend] = store.getEntities((store) => store.backend);

  const backend = await createBackend();
  await validateUrlParams(backend, navigate, params);
});
