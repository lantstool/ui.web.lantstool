import { effect } from '../../../../../../../react-vault/index.js';

export const getCount = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);

  try {
    return await backend.sendRequest('nearProtocol.transactions.getCount', payload);
  } catch (e) {
    console.log(e);
  }
});
