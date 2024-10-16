import { effect } from '../../../../../../../react-vault/index.js';

const getReorderedList = (calls, source, destination) => {
  // We need this to bypass Immer protection - you can't mutate Immer object outside Immer
  const list = [...calls];
  // remove call from the source position and insert into destination position
  const [removedKey] = list.splice(source, 1);
  list.splice(destination, 0, removedKey);
  // update 'order' field for all calls
  return list.map((call, index) => ({ ...call, order: index }));
};

export const reorder = effect(async ({ store, slice, payload }) => {
  const { source, destination } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const list = slice.getState((slice) => slice.list);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const reorderedList = getReorderedList(list, source, destination);
    setList(reorderedList);
    await backend.sendRequest('nearProtocol.calls.reorder', { reorderedList });
  } catch (e) {
    console.log(e);
  }
});
