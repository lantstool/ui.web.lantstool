import { effect } from '../../../react-vault/index.js';

export const onInitApp = effect(async ({ store, payload }) => {
  const getInitDataFromLocalStorage = store.getEffects(
    (store) => store.navigation.getInitDataFromLocalStorage,
  );
  const [_, createIdb] = store.getEntities((store) => store.idb);

  await createIdb();

  const route = await getInitDataFromLocalStorage();
  payload.navigate(route);
});
