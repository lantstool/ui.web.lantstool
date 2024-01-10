import { effect } from '../../../../react-vault';

export const onSaveTransaction = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const updateTransaction = slice.getActions((slice: any) => slice.updateTransaction);
  const transaction = store.getState((store: any) => store.transactions.map[payload.transactionId]);

  const combinedData = {
    ...transaction,
    ...payload,
  };

  try {
    await idb.put('transactions', combinedData);
    updateTransaction(combinedData);
  } catch (e) {
    console.log(e);
  }
});
