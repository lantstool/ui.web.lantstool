import { effect } from '@react-vault';

export const removeRpc = effect(async ({ store, slice, payload }) => {
  const { networkId, spaceId, rpcId, rpcType, close } = payload;

  const [backend] = store.getEntities((store) => store.backend);
  const setRpcList = slice.getActions((slice) => slice.setRpcList);
  const setActiveRpc = slice.getActions((slice) => slice.setActiveRpc);

  try {
    const { rpcList, activeRpc } = await backend.sendRequest('nearProtocol.networks.removeRpc', {
      spaceId,
      networkId,
      rpcType,
      rpcId,
    });

    setRpcList(rpcList);
    setActiveRpc(activeRpc);
    close();
  } catch (e) {
    console.log(e);
  }
});
