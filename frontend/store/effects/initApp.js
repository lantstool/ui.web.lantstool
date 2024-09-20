import { effect } from '../../../react-vault/index.js';

export const initApp = effect(async ({ store }) => {
  const [_, createBackend] = store.getEntities((store) => store.backend);
  await createBackend();
});
