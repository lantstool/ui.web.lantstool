import { effect } from '../../../../../react-vault/index.js';

export const getCount = effect(async ({ store }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    return await backend.sendRequest('spaces.getCount');
  } catch (e) {
    console.log(e);
  }
});
