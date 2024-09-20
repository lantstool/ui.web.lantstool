import { effect } from '../../../../../react-vault/index.js';

export const getAll = effect(async ({ store }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    backend.sendRequest('spaces.getAll');
  } catch (e) {
    console.log(e);
  }
});
