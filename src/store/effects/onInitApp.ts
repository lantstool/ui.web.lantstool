import { effect } from '../../react-vault';

export const onInitApp = effect(async ({ store, payload }: any) => {
  const [_, createIdb] = store.getEntities((store: any) => store.idb);
  await createIdb();
  payload(false);
});
