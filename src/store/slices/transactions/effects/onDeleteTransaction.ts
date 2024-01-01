import { effect } from '../../../../react-vault';

// We need to update the order of all txs which have order > than the deleted one
// because we need to have a subsequent unique order of txs like 0, 1, 2, 3, 4, 5, not 0, 1, 3, 5
// because we use txs count as a tx order for the new tx
// So if we have 6 txs, and we delete the 3rd one - we need to update the order of the 4th, 5th and 6th txs

const updateTxsOrder = async (idb: any, txOrder: number, networkId: string) => {
  const tx = idb.transaction('transactions', 'readwrite');
  const index = tx.store.index('networkIdOrder');

  const updatedTxsOrder: any = {};

  for await (const cursor of index.iterate(
    IDBKeyRange.bound([networkId, txOrder], [networkId, Infinity]),
  )) {
    const transaction = { ...cursor.value, order: cursor.value.order - 1 };
    updatedTxsOrder[transaction.transactionId] = transaction.order;
    cursor.update(transaction);
  }

  await tx.done;

  return updatedTxsOrder;
};

const getNextRoute = (txList: any, activeTxId: string) => {
  // If we have only 1 tx in the list after we will have 0 records
  if (txList.length === 1) return '/transactions';
  const index = txList.findIndex((id: any) => id === activeTxId);
  // If we want to delete the second or further tx - return the upper one
  if (0 < index) return `/transactions/${txList[index - 1]}`;
  // If we want to delete is first tx in the list - return the lover one
  if (0 === index) return `/transactions/${txList[index + 1]}`;
};

export const onDeleteTransaction = effect(async ({ payload, slice, store }: any) => {
  const { transactionId, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const deleteTransaction = slice.getActions((slice: any) => slice.deleteTransaction);
  const { order } = slice.getState((slice: any) => slice.map[transactionId]);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const list = slice.getState((slice: any) => slice.list);
    const nextRoute = getNextRoute(list, transactionId);

    await idb.delete('transactions', transactionId);
    const updatedTxsOrder = await updateTxsOrder(idb, order, networkId);
    deleteTransaction({ transactionId, updatedTxsOrder });
    navigate(nextRoute);
  } catch (e) {
    console.log(e);
  }
});
