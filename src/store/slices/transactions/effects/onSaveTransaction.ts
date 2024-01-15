import { effect } from '../../../../react-vault';

export const onSaveTransaction = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const updateTransaction = slice.getActions((slice: any) => slice.updateTransaction);

  try {
    await idb.put('transactions', payload);
    updateTransaction(payload);
  } catch (e) {
    console.log(e);
  }
});
