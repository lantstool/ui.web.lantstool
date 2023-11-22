import { effect } from '../../../react-vault';

export const onDeleteTransaction = effect(async ({ payload: transactionId, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const deleteTransaction = slice.getActions((slice: any) => slice.deleteTransaction);

  try {
    await idb.delete('transactions', transactionId);
    deleteTransaction(transactionId);
  } catch (e) {
    console.log(e);
  }
});
