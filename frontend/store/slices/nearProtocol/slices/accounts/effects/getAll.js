import { effect } from '@react-vault';

export const getAll = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setAccounts = slice.getActions((slice) => slice.setAccounts);

  try {
    const accounts = await backend.sendRequest('nearProtocol.accounts.getAll', payload);
    setAccounts(accounts);
  } catch (e) {
    console.log(e);
  }
});
