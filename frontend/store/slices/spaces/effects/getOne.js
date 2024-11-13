import { effect } from '@react-vault';

export const getOne = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  try {
    return await backend.sendRequest('spaces.getOne', payload);
  } catch (e) {
    console.log(e);
  }
});
