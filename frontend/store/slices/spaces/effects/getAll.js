import { effect } from '../../../../../react-vault/index.js';

export const getAll = effect(async ({ store }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const res = await backend.sendRequest('spaces.getAll');
    console.log(res);
  } catch (e) {
    console.log(e);
  }
});
