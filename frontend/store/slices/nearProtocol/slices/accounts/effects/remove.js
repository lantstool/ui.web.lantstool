import { effect } from '@react-vault';

export const remove = effect(async ({ slice, store, payload }) => {
  const { spaceId, networkId, accountId, navigate, setOpen } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const removeAccount = slice.getActions((slice) => slice.removeAccount);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    await backend.sendRequest('nearProtocol.accounts.remove', { spaceId, networkId, accountId });

    removeAccount(accountId);
    navigate(`../../accounts`, { relative: 'path', replace: true });
    setOpen(false);
    setNotification({ isOpen: true, message: 'Account removed', variant: 'black' });
  } catch (e) {
    console.log(e);
  }
});
