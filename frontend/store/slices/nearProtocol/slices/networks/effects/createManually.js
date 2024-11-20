import { effect } from '@react-vault';

export const createManually = effect(async ({ store, slice, payload }) => {
  const { spaceId, formValues, navigate, setError } = payload;
  const { rpcName, url, header } = formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const putOneToList = slice.getActions((slice) => slice.putOneToList);
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);

  try {
    await rpc.configure({ spaceId, networkId });
    const networkId = await rpc.getNodeStatus();
    console.log(await rpc.getNodeStatus());

    // await rpc.configure({ spaceId, networkId });
    // const genesisConfig = await rpc.getGenesisConfig();

    // console.log(genesisConfig);

    // const activeRpc = {
    //   url,
    //   rpcName,
    //   type: 'regular',
    //   logo: 'defaultIcon.svg',
    //   header,
    //   links: null,
    //   isPreset: false,
    // };
    //
    // const network = await backend.sendRequest('nearProtocol.networks.createManually', {
    //   spaceId,
    //   formValues,
    //   networkId,
    // });
    //
    // putOneToList(network);
    // navigate(`../../${network.networkId}/transactions`, { relative: 'path' });
  } catch (e) {
    console.log(e);
    setError('url', { type: 500, message: e.message });
  }
});
