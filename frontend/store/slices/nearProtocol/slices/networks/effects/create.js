import { effect } from '../../../../../../../react-vault/index.js';

export const create = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, formValues, navigate, setError } = payload;

  try {
    const network = await backend.sendRequest('nearProtocol.networks.create', {
      spaceId,
      formValues,
    });
    console.log(network);

    navigate(`../../${network.networkId}/transactions`, { relative: 'path' });
  } catch (e) {
    console.log(e);
    setError('rpc', { type: 500, message: e.message });
  }
});
