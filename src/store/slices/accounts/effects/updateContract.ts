import { effect } from '../../../../react-vault';

export const updateContract = effect(async ({ slice, store, payload }: any) => {
  const { contractId, accountId } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const account = store.getState((store: any) => store.accounts.records[accountId]);
  const setContract = slice.getActions((slice: any) => slice.setContract);

  try {
    const newAccount = {
      ...account,
      contractId,
    };

    await idb.put('accounts', newAccount);
    setContract({ newAccount, accountId });
  } catch (e) {
    console.log(e);
  }
});
