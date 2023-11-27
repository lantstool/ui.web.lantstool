import { effect } from '../../../react-vault';

export const onAddAccount = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const addAccount = slice.getActions((slice: any) => slice.addAccount);
  const accountId = payload.data.accountId;

  try {
    const account = {
      accountId,
    };
    await idb.add('vault', account);
    addAccount({ accountId });
    payload.closeModal(false);
  } catch (e) {
    console.log(e)
  }
});
