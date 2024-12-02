import { effect } from '@react-vault';

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
  1. Get current block height
  2. Get epoch_length.
  3. Calculate the block issued 6 epoch away - the regular rpc keep only the 5 last epoches
  4. Try to fetch it - if ok - it's an archival rpc

  TODO we may have a situation when user will try to add the RPC of a newly
    created local network. In this case we can't detect if RPC runs in regular
    or archival mode - this algorithm will assume that it's an archived RPC.
    For such case we need to add a UI with ability to select of RPC type.
 */
const getRpcType = async (rpc, epochLength) => {
  try {
    const latestBlock = await rpc.getBlock({});
    const archivedBlockHeight = latestBlock.header.height - epochLength * 6;
    await rpc.getBlock({ blockId: archivedBlockHeight });
    return 'archival';
  } catch (e) {
    if (e?.rpc?.cause?.name === 'UNKNOWN_BLOCK') return 'regular';
    throw e;
  }
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
