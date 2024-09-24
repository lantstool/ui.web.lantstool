import { effect } from '../../../../../../../react-vault/index.js';

export const remove = effect(async ({ store, payload }) => {
  const { spaceId, networkId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    await backend.sendRequest('nearProtocol.networks.remove', { spaceId, networkId });
    // TODO Delete from navigate history
    navigate('../../networks', { relative: 'path', replace: true });
  } catch (e) {
    console.log(e);
  }
});
