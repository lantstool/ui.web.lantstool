import { effect } from '../../../../react-vault';

export const onEditTransactionName = effect(async ({ payload, slice, store }: any) => {
  const { transactionId, transactionName } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const updateTransaction = slice.getActions((slice: any) => slice.updateTransaction);
  const oldTransaction = store.getState((state: any) => state.transactions.map[transactionId]);

  try {
    const record = await idb.get('transactions', transactionId);
    record.name = transactionName;

    await idb.put('transactions', record);
    updateTransaction({ ...record, results: oldTransaction.results });
  } catch (e) {
    console.log(e);
  }
});
