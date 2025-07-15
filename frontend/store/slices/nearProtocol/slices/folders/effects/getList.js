import { effect } from '@react-vault';

export const getList = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const list = await backend.sendRequest('nearProtocol.folders.getList', payload);

    //Transform collapsed for boolean type because DB doesn't support boolean
    const newList = list.map((item) => ({
      ...item,
      collapsed: item.collapsed === 0,
    }));

    setList(newList);
  } catch (e) {
    console.log(e);
  }
});
