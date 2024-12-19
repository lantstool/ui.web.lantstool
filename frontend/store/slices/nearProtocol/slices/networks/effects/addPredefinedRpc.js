import { effect } from '@react-vault';

export const addPredefinedRpc = effect(async ({ store, slice, payload }) => {
  const {
    network,
    formValues: { rpcType, selectedRpc },
    close,
  } = payload;

  const [backend] = store.getEntities((store) => store.backend);
  const addRpc = slice.getActions((slice) => slice.addRpc);

  try {
    await backend.sendRequest('nearProtocol.networks.addRpc', {
      spaceId: network.spaceId,
      networkId: network.networkId,
      rpcType,
      rpc: selectedRpc,
    });

    addRpc({ rpc: selectedRpc, rpcType });
    close();
  } catch (e) {
    console.log(e);
  }
});
