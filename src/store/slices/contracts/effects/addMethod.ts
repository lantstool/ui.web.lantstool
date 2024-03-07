import { effect } from '../../../../react-vault';

export const addMethod = effect(async ({ payload, slice, store }: any) => {
  const { formValues, contractId, setEdit } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const setMethod = slice.getActions((slice: any) => slice.setMethod);
  const records = store.getState((store: any) => store.contracts.records);

  try {
    const contracts = { ...records[contractId], methods: formValues };

    await idb.put('contracts', contracts);
    setMethod({ formValues, contractId });
    setEdit(false);
  } catch (e) {
    console.log(e);
  }
});
