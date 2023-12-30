import { effect } from '../../../../react-vault';

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

  try {
    const list = slice.getState((slice: any) => slice.list);
    const nextRoute = getNextRoute(list, transactionId);
    console.log(nextRoute);

    await idb.delete('transactions', transactionId);
    deleteTransaction(transactionId);
    navigate(nextRoute);
  } catch (e) {
    console.log(e);
  }
});
