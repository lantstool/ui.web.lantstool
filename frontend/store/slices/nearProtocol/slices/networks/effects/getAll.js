import { effect } from '../../../../../../../react-vault/index.js';

export const getAll = effect(async ({ store, payload: spaceId }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const networks = await backend.sendRequest('nearProtocol.networks.getAll', {
      spaceId,
    });
    console.log('networks ', networks);
    return networks;
  } catch (e) {
    console.log(e);
  }
});
