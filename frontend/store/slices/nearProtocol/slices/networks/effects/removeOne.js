import { effect } from '@react-vault';

export const removeOne = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const removeOneFromList = slice.getActions((slice) => slice.removeOneFromList);

  try {
    await backend.sendRequest('nearProtocol.networks.removeOne', { spaceId, networkId });
    removeOneFromList(networkId);

    history.remove(`/space/${spaceId}/near-protocol/${networkId}`);
    navigate('../../networks', { relative: 'path', replace: true });
  } catch (e) {
    console.log(e);
  }
});
