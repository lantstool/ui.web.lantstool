import { effect } from '@react-vault';

export const reorder = effect(async ({ store, slice, payload }) => {
  const { reorderedCallList } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    setList(reorderedCallList);

    await backend.sendRequest('nearProtocol.calls.reorder', { reorderedCallList });
  } catch (e) {
    console.log(e);
  }
});
