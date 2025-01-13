import { matchPath } from 'react-router-dom';
import { presets } from '../../slices/nearProtocol/slices/networks/presets.js';
import { createTx } from './createTx.js';
import { createCall } from './createCall.js';

const checkIfNetworkExist = async ({ backend, spaceId, networkId }) => {
  try {
    await backend.sendRequest('nearProtocol.networks.getOne', {
      spaceId,
      networkId,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const addToExistingSpace = async ({ json, navigate, lastSelectedSpacePath, store }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setNotification = store.getActions((store) => store.setNotification);
  const putNetworkToList = store.getActions((store) => store.nearProtocol.networks.putOneToList);

  const match = matchPath('/space/:spaceId/*', lastSelectedSpacePath);
  const spaceId = match?.params?.spaceId;
  const networkId = json.networkId;

  const isNetworkExist = await checkIfNetworkExist({ backend, spaceId, networkId });

  if (!isNetworkExist) {
    const network = await backend.sendRequest('nearProtocol.networks.createFromPreset', {
      spaceId,
      preset: presets[networkId],
    });
    putNetworkToList(network);
  }

  if (json.transaction)
    await createTx({
      json,
      store,
      backend,
      spaceId,
      networkId,
      navigate,
      setNotification,
    });

  if (json.call)
    await createCall({
      json,
      backend,
      spaceId,
      networkId,
      navigate,
      setNotification,
    });
};
