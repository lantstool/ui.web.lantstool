import { effect } from '../../../../react-vault';

const reorder = (list: any, currentOrder: number, newOrder: number) => {
  const keys = Object.keys(list);

  const [removedKey] = keys.splice(currentOrder, 1);

  keys.splice(newOrder, 0, removedKey);

  const reorderList = {};
  keys.forEach((key, index) => {
    const transaction = { ...list[key] };
    transaction.order = index;
    reorderList[key] = transaction;
  });

  return reorderList;
};

export const onReorderTransactions = effect(async ({ payload, slice, store }: any) => {
  const { currentOrder, newOrder } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const reorderTransactions = slice.getActions((slice: any) => slice.reorderTransactions);
  const list = store.getState((store: any) => store.transactions.map);
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);

  try {
    const reorderMap = reorder(list, currentOrder, newOrder);
    const reorderList = Object.keys(reorderMap);

    reorderTransactions({ reorderMap, reorderList });

    const transactions = await idb.getAllFromIndex(
      'transactions',
      'spaceId_networkId_order',
      IDBKeyRange.bound(['space1', networkId, 0], [spaceId, networkId, Infinity]),
    );

    await Promise.all(
      reorderList.map((id, index) => {
        const transactionToUpdate = transactions.find((el: any) => el.transactionId === id);
        if (transactionToUpdate) {
          transactionToUpdate.order = index;
          return idb.put('transactions', transactionToUpdate);
        }
      }),
    );
  } catch (e) {
    console.log(e);
  }
});
