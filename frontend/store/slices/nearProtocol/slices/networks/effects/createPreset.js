import { effect } from '@react-vault';
import { rpcListConfig } from '../../../../spaces/rpcListConfig.js';

export const createPreset = effect(async ({ store, slice, payload }) => {
  const { spaceId, formValues, navigate, setError } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const putOneToList = slice.getActions((slice) => slice.putOneToList);

  try {
    const rpcActive = {
      regular: { autoSwitch: true },
      archive: { autoSwitch: false },
    };
    const listRpc = rpcListConfig[formValues.networkId];

    const network = await backend.sendRequest('nearProtocol.networks.createPreset', {
      spaceId,
      rpcActive,
      listRpc,
      formValues,
    });

    putOneToList(network);
    navigate(`../../${network.networkId}/transactions`, { relative: 'path' });
  } catch (e) {
    console.log(e);
    setError('rpc', { type: 500, message: e.message });
  }
});
