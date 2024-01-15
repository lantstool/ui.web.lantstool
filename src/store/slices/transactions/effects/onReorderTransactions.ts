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

  try {
    const reorderMap = reorder(list, currentOrder, newOrder);
    const reorderList = Object.keys(reorderMap);
    const transactions = await idb.getAll('transactions');

    await Promise.all(
      reorderList.map((id, index) => {
        const transactionToUpdate = transactions.find((el: any) => el.transactionId === id);
        if (transactionToUpdate) {
          transactionToUpdate.order = index;
          return idb.put('transactions', transactionToUpdate);
        }
      }),
    );

    reorderTransactions({ reorderMap, reorderList });
  } catch (e) {
    console.log(e);
  }
});
