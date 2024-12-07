import { effect } from '@react-vault';

export const updateActiveRpc = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const editActiveRpc = slice.getActions((slice) => slice.editActiveRpc);

  try {
    editActiveRpc(payload);
    backend.sendRequest('nearProtocol.networks.updateActiveRpc', payload);
  } catch (e) {
    console.log(e);
  }
});
