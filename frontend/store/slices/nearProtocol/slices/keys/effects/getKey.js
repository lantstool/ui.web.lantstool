import { effect } from '../../../../../../../react-vault/index.js';

export const getKey = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    return await backend.sendRequest('nearProtocol.keys.getOne', payload);
  } catch (e) {
    console.log(e);
  }
});
