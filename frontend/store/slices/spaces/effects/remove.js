import { effect } from '@react-vault';

export const remove = effect(async ({ store, slice, payload }) => {
  const { spaceId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const removeOneFromList = slice.getActions((slice) => slice.removeOneFromList);

  try {
    await backend.sendRequest('spaces.remove', { spaceId });
    removeOneFromList(spaceId);
    // TODO Delete from navigate history
    navigate('/spaces', { replace: true });
  } catch (e) {
    console.log(e);
  }
});
