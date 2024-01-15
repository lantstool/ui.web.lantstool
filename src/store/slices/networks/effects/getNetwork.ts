import { effect } from '../../../../react-vault';

export const getNetwork = effect(async ({ payload: networkId, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const setCurrentNetwork = slice.getActions((slice: any) => slice.setCurrentNetwork);

  try {
    const network = await idb.get('networks', networkId);
    setCurrentNetwork(network);
  } catch (e) {
    console.log(e);
  }
});
