import { effect } from '@react-vault';

export const getAll = effect(async ({ store, slice }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setAll = slice.getActions((slice) => slice.setAll);

  try {
    const spaces = await backend.sendRequest('spaces.getAll');
    setAll(spaces);
  } catch (e) {
    console.log(e);
  }
});
