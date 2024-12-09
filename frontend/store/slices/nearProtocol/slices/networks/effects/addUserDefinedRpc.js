import { effect } from '@react-vault';
import { v4 as uuid } from 'uuid';
import { getRpcType } from './helpers/getRpcType.js';

export const addUserDefinedRpc = effect(async ({ store, slice, payload }) => {
  const { network, formValues, close } = payload;
  const { name, url, header } = formValues;
  const { networkId, spaceId } = network;

  const [backend] = store.getEntities((store) => store.backend);
  const [rpcProvider] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const addRpc = slice.getActions((slice) => slice.addRpc);
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
        message: `This RPC cannot be added to the ‘${networkId}’ network - it's 
        a ‘${chainId}’ network RPC`,
        variant: 'error',
        delay: 5000,
      });
      return;
    }

    const rpcType = await getRpcType(rpcProvider, epochLength);

    const rpc = {
      id: uuid(),
      name,
      url,
      logo: 'default-rpc',
      headers: header ? [header] : [],
      links: null,
      isPredefined: false,
    };

    await backend.sendRequest('nearProtocol.networks.addRpc', {
      spaceId,
      networkId,
      rpc,
      rpcType,
    });

    addRpc({ rpc, rpcType });
    close();
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: e.message, variant: 'error', delay: 2500 });
  }
});
