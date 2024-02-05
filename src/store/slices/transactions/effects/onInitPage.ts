import { effect } from '../../../../react-vault';

export const onInitPage = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const initPage = slice.getActions((slice: any) => slice.initPage);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const transactions = await idb.getAllFromIndex(
      'transactions',
      'spaceId_networkId_order',
      IDBKeyRange.bound(['space1', networkId, 0], ['space1', networkId, Infinity]),
    );

    payload(false);
    initPage({ transactions });
  } catch (e) {
    console.log(e);
  }
});
