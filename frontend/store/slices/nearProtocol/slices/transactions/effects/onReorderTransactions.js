import { effect } from '../../../../../../../react-vault/index.js';

const reorder = (list, currentOrder, newOrder) => {
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

export const onReorderTransactions = effect(async ({ payload, slice, store }) => {
  const { currentOrder, newOrder } = payload;
  const [idb] = store.getEntities((store) => store.idb);
  const reorderTransactions = slice.getActions((slice) => slice.reorderTransactions);
  const list = store.getState((store) => store.transactions.map);
  const networkId = store.getState((store) => store.networks.current.networkId);
  const spaceId = store.getState((store) => store.networks.current.spaceId);

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
        const transactionToUpdate = transactions.find((el) => el.transactionId === id);
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
