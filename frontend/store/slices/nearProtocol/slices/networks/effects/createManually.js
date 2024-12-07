import { effect } from '@react-vault';
import { getRpcType } from './helpers/getRpcType.js';

const validateNetworkId = async (backend, spaceId, networkId) => {
  // We don't really expect that someone would create a network with id 'networks',
  // but if it happens it will break the app.
  if (networkId === 'networks')
    throw new Error(`
      You can't import network with ID 'networks' - 'networks' is an inner keyword
    `);

  const isNetwork = await backend.sendRequest('nearProtocol.networks.isOne', {
    spaceId,
    networkId,
  });

  if (isNetwork)
    throw new Error(`
      The network ‘${networkId}’ is already exists in this space - 
      you cannot add the same network twice
    `);
};

/*
  1. Get network id.
  2. Check if network not exits.
  3. TODO: Check if RPC works correctly - skip for now
  4. Determinate if RPC archival or not
*/
export const createManually = effect(async ({ store, slice, payload }) => {
  const { spaceId, formValues, navigate } = payload;
  const { rpcName, url, header } = formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const putOneToList = slice.getActions((slice) => slice.putOneToList);
  const [rpcProvider] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    rpcProvider.specify({
      url,
      headers: header ? [header] : [],
    });

    const { chainId, epochLength } = await rpcProvider.getGenesisConfig({});
    await validateNetworkId(backend, spaceId, chainId);
    const rpcType = await getRpcType(rpcProvider, epochLength);

    const rpc = {
      name: rpcName,
      url,
      logo: 'default-rpc',
      headers: header ? [header] : [],
      links: null,
      isPredefined: false,
    };

    const network = await backend.sendRequest('nearProtocol.networks.createManually', {
      spaceId,
      networkId: chainId,
      rpc,
      rpcType,
    });

    putOneToList(network);
    navigate(`../../${network.networkId}/transactions`, { relative: 'path' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: e.message, variant: 'error', delay: 2500 });
  }
});
