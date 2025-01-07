import { presets } from '../../slices/nearProtocol/slices/networks/presets.js';

export const createFromPresetNetwork = async ({ store, formValues, navigate }) => {
  const { spaceName, badge, presetId } = formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const putSpaceToList = store.getActions((store) => store.spaces.putOneToList);
  const putNetworkToList = store.getActions((store) => store.nearProtocol.networks.putOneToList);

  const preset = presets[presetId];

  const space = await backend.sendRequest('spaces.create', { spaceName, badge });
  putSpaceToList(space);

  const network = await backend.sendRequest('nearProtocol.networks.createFromPreset', {
    spaceId: space.spaceId,
    preset,
  });

  putNetworkToList(network);
  navigate(`/space/${space.spaceId}/near-protocol/${network.networkId}/transactions`);
};
