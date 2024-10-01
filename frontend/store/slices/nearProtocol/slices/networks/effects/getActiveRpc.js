import { effect } from '../../../../../../../react-vault/index.js';

export const getActiveRpc = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    return await backend.sendRequest('nearProtocol.networks.getActiveRpc', payload);
  } catch (e) {
    console.log(e);
  }
});
