import { effect } from '@react-vault';
import { getRpcType } from '../slices/nearProtocol/slices/networks/effects/helpers/getRpcType.js';

const validateNetworkId = async (backend, networkId) => {
  // We don't really expect that someone would create a network with id 'networks',
  // but if it happens it will break the app.
  if (networkId === 'networks')
    throw new Error(`
      You can't import network with ID 'networks' - 'networks' is an inner keyword
    `);
};

export const createManuallyNetwork = effect(async ({ store, payload }) => {
  const { formValues, navigate } = payload;
  const { name, url, header, spaceName, badge } = formValues;
  console.log(formValues);
  const [backend] = store.getEntities((store) => store.backend);
  const putSpaceToList = store.getActions((store) => store.spaces.putOneToList);
  const putNetworkToList = store.getActions((store) => store.nearProtocol.networks.putOneToList);
  const [rpcProvider] = store.getEntities((store) => store.nearProtocol.rpcProvider);

  rpcProvider.specify({
    url,
    headers: header ? [header] : [],
  });

  const { chainId, epochLength } = await rpcProvider.getGenesisConfig({});
  await validateNetworkId(backend, chainId);
  const rpcType = await getRpcType(rpcProvider, epochLength);

  const space = await backend.sendRequest('spaces.create', { spaceName, badge });
  putSpaceToList(space);

  const rpc = {
    name,
    url,
    logo: 'default-rpc',
    headers: header ? [header] : [],
    links: null,
    isPredefined: false,
  };

  const network = await backend.sendRequest('nearProtocol.networks.createManually', {
    spaceId: space.spaceId,
    networkId: chainId,
    rpc,
    rpcType,
  });

  putNetworkToList(network);
  navigate(`/space/${space.spaceId}/near-protocol/${network.networkId}/transactions`);
});
