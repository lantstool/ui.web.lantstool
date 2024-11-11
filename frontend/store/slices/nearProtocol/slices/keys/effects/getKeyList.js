import { effect } from '@react-vault';

export const getKeyList = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setKeyList = slice.getActions((slice) => slice.setKeyList);

  try {
    const keys = await backend.sendRequest('nearProtocol.keys.getKeyList', payload);
    setKeyList(keys);
  } catch (e) {
    console.log(e);
  }
});
