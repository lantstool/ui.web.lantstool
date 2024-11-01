import { effect } from '@react-vault';

export const getIds = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    return await backend.sendRequest('nearProtocol.accounts.getIds', payload);
  } catch (e) {
    console.log(e);
  }
});
