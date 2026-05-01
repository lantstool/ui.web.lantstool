import { effect } from '@react-vault';

export const getAccount = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    return await backend.sendRequest('nearProtocol.accounts.getOne', payload);
  } catch (e) {
    console.log(e);
  }
});
