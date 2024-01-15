import { effect } from '../../react-vault';

export const onInitApp = effect(async ({ store, payload }: any) => {
  const [_, createIdb] = store.getEntities((store: any) => store.idb);
  const getNetworks = store.getEffects((store: any) => store.networks.getNetworks);

  await createIdb();
  await getNetworks();
  payload(false);
});
