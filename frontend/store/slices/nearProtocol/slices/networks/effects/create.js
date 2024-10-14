import { effect } from '../../../../../../../react-vault/index.js';

export const create = effect(async ({ store, slice, payload }) => {
  const { spaceId, formValues, navigate, setError } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const putOneToList = slice.getActions((slice) => slice.putOneToList);

  try {
    const network = await backend.sendRequest('nearProtocol.networks.create', {
      spaceId,
      formValues,
    });

    putOneToList(network);
    navigate(`../../${network.networkId}/transactions`, { relative: 'path' });
  } catch (e) {
    console.log(e);
    setError('rpc', { type: 500, message: e.message });
  }
});
