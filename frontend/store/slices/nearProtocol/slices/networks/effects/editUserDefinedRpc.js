import { effect } from '@react-vault';
import { getRpcType } from './helpers/getRpcType.js';

export const editUserDefinedRpc = effect(async ({ store, slice, payload }) => {
  const { rpc, rpcType, formValues, spaceId, networkId, close } = payload;
  const { name, url, header } = formValues;

  const [backend] = store.getEntities((store) => store.backend);
  const [rpcProvider] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setRpcList = slice.getActions((slice) => slice.setRpcList);
  const setActiveRpc = slice.getActions((slice) => slice.setActiveRpc);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    rpcProvider.specify({
      url,
      headers: header ? [header] : [],
    });

    const { chainId, epochLength } = await rpcProvider.getGenesisConfig({});

    if (chainId !== networkId) {
      setNotification({
        isOpen: true,
        message: `Cannot save changes - after editing, it would point to 
        the ‘${chainId}’ network, but it can only be used in the ‘${networkId}’ network`,
        variant: 'error',
        delay: 5000,
      });
      return;
    }

    const newRpcType = await getRpcType(rpcProvider, epochLength);

    const newRpc = {
      ...rpc,
      name,
      url,
      headers: header ? [header] : [],
    };

    const { activeRpc, rpcList } = await backend.sendRequest('nearProtocol.networks.updateRpc', {
      newRpc,
      rpcType,
      newRpcType,
      spaceId,
      networkId,
    });

    setRpcList(rpcList);
    setActiveRpc(activeRpc);
    close();
    setNotification({ isOpen: true, message: 'Changes saved', variant: 'success' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Cannot update the RPC', variant: 'error' });
  }
});
