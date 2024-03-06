import { effect } from '../../../../react-vault';

const getAccount = (spaceId: any, networkId: any, accountId: any, accountName: any) => {
  return {
    spaceId,
    networkId,
    accountId,
    accountName,
    importedAt: Date.now(),
    contract: {
      name: null,
      methods: {
        change: [],
        view: [],
      },
    },
  };
};

export const addAccount = effect(async ({ slice, store, payload }: any) => {
  const { formValue, setAccId, resetField } = payload;
  const { accountId, accountName } = formValue;
  const [idb] = store.getEntities((store: any) => store.idb);
  const { spaceId, networkId } = store.getState((store: any) => store.networks.current);
  const setAccount = slice.getActions((slice: any) => slice.setAccount);

  try {
    const account = getAccount(spaceId, networkId, accountId, accountName);

    await idb.put('accounts', account);
    setAccount(account);

    setAccId(formValue.accountId);
    resetField('accountId');
    resetField('accountName');
  } catch (e) {
    console.log(e);
  }
});
