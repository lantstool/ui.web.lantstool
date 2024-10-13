import { effect } from '../../../../../../../react-vault/index.js';

export const removeKey = effect(async ({ store, payload }) => {
  const { spaceId, networkId, publicKey, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    await backend.sendRequest('nearProtocol.keys.remove', { spaceId, networkId, publicKey });
    // TODO Delete from navigate history
    navigate('..', { relative: 'path', replace: true });
  } catch (e) {
    console.log(e);
  }
});
