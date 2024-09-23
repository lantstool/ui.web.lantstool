import { effect } from '../../../../../react-vault/index.js';

export const deleteSpace = effect(async ({ store, payload }) => {
  const { spaceId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    await backend.sendRequest('spaces.deleteSpace', { spaceId });
    // TODO Delete from the state?
    // TODO Delete from navigate history
    navigate('/spaces');
  } catch (e) {
    console.log(e);
  }
});
