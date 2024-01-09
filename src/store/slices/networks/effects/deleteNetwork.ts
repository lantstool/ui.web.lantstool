import { effect } from '../../../../react-vault';

export const deleteNetwork = effect(async ({ payload: networkId, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeNetwork = slice.getActions((slice: any) => slice.removeNetwork);

  try {
    await idb.delete('networks', networkId);
    removeNetwork(networkId);
  } catch (e) {
    console.log(e);
  }
});
