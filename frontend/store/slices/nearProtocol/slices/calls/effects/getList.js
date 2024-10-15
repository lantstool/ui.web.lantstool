import { effect } from '../../../../../../../react-vault/index.js';

export const getList = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const list = await backend.sendRequest('nearProtocol.calls.getList', payload);
    setList(list);
  } catch (e) {
    console.log(e);
  }
});
