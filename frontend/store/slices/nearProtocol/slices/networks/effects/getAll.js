import { effect } from '../../../../../../../react-vault/index.js';

export const getAll = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setNetworks = slice.getActions((slice) => slice.setNetworks);

  try {
    const networks = await backend.sendRequest('nearProtocol.networks.getAll', payload);
    setNetworks(networks);
  } catch (e) {
    console.log(e);
  }
});
