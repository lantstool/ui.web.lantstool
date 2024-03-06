import { effect } from '../../../../react-vault';

export const addMethod = effect(async ({ payload, slice, store }: any) => {
  const { formValues, contractId, setEdit } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const setMethod = slice.getActions((slice: any) => slice.setMethod);

  try {
    const record = await idb.get('contracts', contractId);
    record.methods = formValues;

    await idb.put('contracts', record);
    setMethod({ formValues, contractId });
    setEdit(false);
  } catch (e) {
    console.log(e);
  }
});
