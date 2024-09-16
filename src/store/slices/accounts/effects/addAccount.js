import { effect } from '../../../../react-vault/index.js';

const getAccount = (spaceId, networkId, accountId, accountName) => {
  return {
    spaceId,
    networkId,
    accountId,
    accountName,
    importedAt: Date.now(),
  };
};

export const addAccount = effect(async ({ slice, store, payload }) => {
  const { formValue, setAccId, resetField } = payload;
  const { accountId, accountName } = formValue;
  const [idb] = store.getEntities((store) => store.idb);
  const { spaceId, networkId } = store.getState((store) => store.networks.current);
  const setAccount = slice.getActions((slice) => slice.setAccount);

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
