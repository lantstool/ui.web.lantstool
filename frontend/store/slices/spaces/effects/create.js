import { effect } from '../../../../../react-vault/index.js';

export const create = effect(async ({ store }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    backend.postMessage({ request: 'spaces.create' });
    // get space id and set data to state
  } catch (e) {
    console.log(e);
  }
});
