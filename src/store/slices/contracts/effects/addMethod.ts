import { effect } from '../../../../react-vault';

export const addMethod = effect(async ({ payload, slice, store }: any) => {
  const { formValues, contractId, setEdit } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const setMethod = slice.getActions((slice: any) => slice.setMethod);
  const record = store.getState((store: any) => store.contracts.records[contractId]);

  try {
    const contract = { ...record, methods: formValues };

    await idb.put('contracts', contract);
    setMethod({ formValues, contractId });
    setEdit(false);
  } catch (e) {
    console.log(e);
  }
});
