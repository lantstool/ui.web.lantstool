import { effect } from '@react-vault';

export const addUserDefinedRpc = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  // const editActiveRpc = slice.getActions((slice) => slice.editActiveRpc);

  try {
    // editActiveRpc(payload);
    backend.sendRequest('nearProtocol.networks.addUserDefinedRpc', payload);
  } catch (e) {
    console.log(e);
  }
});
