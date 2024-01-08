import { effect } from '../../../../react-vault';

export const editNetwork = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const updateNetwork = slice.getActions((slice: any) => slice.updateNetwork);

  try {
    await idb.put('networks', payload);
    updateNetwork(payload);
  } catch (e) {
    console.log(e);
  }
});
