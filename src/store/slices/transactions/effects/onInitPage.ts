import { effect } from '../../../../react-vault';

export const onInitPage = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const initPage = slice.getActions((slice: any) => slice.initPage);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const transactions = await idb.getAllFromIndex(
      'transactions',
      'networkIdOrder',
      IDBKeyRange.bound([networkId, 0], [networkId, Infinity]),
    );

    payload(false);
    initPage({ transactions });
  } catch (e) {
    console.log(e);
  }
});
