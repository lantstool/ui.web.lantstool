import { effect } from '@react-vault';

export const remove = effect(async ({ store, slice, payload }) => {
  const { spaceId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const removeOneFromList = slice.getActions((slice) => slice.removeOneFromList);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    await backend.sendRequest('spaces.remove', { spaceId });
    removeOneFromList(spaceId);

    history.remove(`/space/${spaceId}`);
    navigate('/spaces', { replace: true });

    setNotification({ isOpen: true, message: 'Space deleted', variant: 'black' });
  } catch (e) {
    console.log(e);
  }
});
