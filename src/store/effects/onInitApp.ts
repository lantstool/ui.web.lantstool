import { effect } from '../../react-vault';

export const onInitApp = effect(async ({ store, payload }: any) => {
  const getInitDataFromLocalStorage = store.getEffects(
    (store: any) => store.navigation.getInitDataFromLocalStorage,
  );
  const [_, createIdb] = store.getEntities((store: any) => store.idb);

  await createIdb();

  const route = await getInitDataFromLocalStorage();
  payload.navigate(route);
});
