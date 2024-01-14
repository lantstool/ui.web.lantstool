import { effect } from '../../react-vault';

export const onInitApp = effect(async ({ store }: any) => {
  const [_, createIdb] = store.getEntities((store: any) => store.idb);
  await createIdb();
});
