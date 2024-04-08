import { effect } from '../../../../react-vault';

export const getOnceTransactions = effect(async ({ slice, store }: any) => {
  const list = slice.getState((slice: any) => slice.list);
  if (list.length > 0) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const initPage = slice.getActions((slice: any) => slice.initPage);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const transactions = await idb.getAllFromIndex(
      'transactions',
      'spaceId_networkId_order',
      IDBKeyRange.bound(['space1', networkId, 0], ['space1', networkId, Infinity]),
    );

    initPage({ transactions });
  } catch (e) {
    console.log(e);
  }
});
