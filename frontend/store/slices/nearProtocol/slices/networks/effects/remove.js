import { effect } from '@react-vault';

export const remove = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const removeOneFromList = slice.getActions((slice) => slice.removeOneFromList);

  try {
    await backend.sendRequest('nearProtocol.networks.remove', { spaceId, networkId });
    removeOneFromList(networkId);
    // TODO Delete from navigate history
    navigate('../../networks', { relative: 'path', replace: true });
  } catch (e) {
    console.log(e);
  }
});
