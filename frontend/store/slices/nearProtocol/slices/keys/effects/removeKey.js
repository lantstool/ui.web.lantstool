import { effect } from '@react-vault';

export const removeKey = effect(async ({ store, payload }) => {
  const { spaceId, networkId, publicKey, navigate, closeModal } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    await backend.sendRequest('nearProtocol.keys.remove', { spaceId, networkId, publicKey });
    // TODO Delete from navigate history
    navigate('..', { relative: 'path', replace: true });
    setNotification({ isOpen: true, message: 'Key removed', variant: 'black' });
    closeModal();
  } catch (e) {
    console.log(e);
  }
});
