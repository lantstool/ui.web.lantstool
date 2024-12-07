import { effect } from '@react-vault';

export const addUserDefinedRpc = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setActiveRpc = slice.getActions((slice) => slice.setActiveRpc);

  try {
    setActiveRpc(payload);
    backend.sendRequest('nearProtocol.networks.updateActiveRpc', payload);
  } catch (e) {
    console.log(e);
  }
});
