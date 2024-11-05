import { effect } from '@react-vault';

export const getPublicKey = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    return await backend.sendRequest('nearProtocol.keys.getPublicKey', payload);
  } catch (e) {
    return false;
  }
});
