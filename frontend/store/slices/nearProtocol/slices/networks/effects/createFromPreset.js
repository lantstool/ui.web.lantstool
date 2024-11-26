import { effect } from '@react-vault';
import { presets } from '../presets.js';

export const createFromPreset = effect(async ({ store, slice, payload }) => {
  const { spaceId, formValues, navigate, setError } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const putOneToList = slice.getActions((slice) => slice.putOneToList);

  try {
    const preset = presets[formValues.presetId];

    const network = await backend.sendRequest('nearProtocol.networks.createFromPreset', {
      spaceId,
      preset,
    });

    putOneToList(network);
    navigate(`../../${network.networkId}/transactions`, { relative: 'path' });
  } catch (e) {
    console.log(e);
    setError('rpc', { type: 500, message: e.message });
  }
});
