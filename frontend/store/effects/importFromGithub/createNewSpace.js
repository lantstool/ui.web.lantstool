import { presets } from '../../slices/nearProtocol/slices/networks/presets.js';
import { createCall } from './createCall.js';
import { createTx } from './createTx.js';

export const createNewSpace = async ({ json, navigate, store }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setNotification = store.getActions((store) => store.setNotification);
  const putSpaceToList = store.getActions((store) => store.spaces.putOneToList);
  const putNetworkToList = store.getActions((store) => store.nearProtocol.networks.putOneToList);

  const space = await backend.sendRequest('spaces.create', {
    spaceName: 'Examples',
    badge: 'green',
  });
  putSpaceToList(space);

  const network = await backend.sendRequest('nearProtocol.networks.createFromPreset', {
    spaceId: space.spaceId,
    preset: presets[json.networkId],
  });
  putNetworkToList(network);

  if (json.transaction)
    await createTx({
      json,
      store,
      backend,
      spaceId: space.spaceId,
      networkId: json.networkId,
      navigate,
      setNotification,
    });

  if (json.call)
    await createCall({
      json,
      backend,
      spaceId: space.spaceId,
      networkId: json.networkId,
      navigate,
      setNotification,
    });
};
