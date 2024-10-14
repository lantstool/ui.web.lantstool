import { effect } from '../../../../../../../react-vault/index.js';

export const getAll = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setToList = slice.getActions((slice) => slice.setToList);

  try {
    const networks = await backend.sendRequest('nearProtocol.networks.getAll', payload);
    setToList(networks);
  } catch (e) {
    console.log(e);
  }
});
