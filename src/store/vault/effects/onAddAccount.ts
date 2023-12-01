import { effect } from '../../../react-vault';

export const onAddAccount = effect(async ({ payload, slice, store }: any) => {
  const { closeModal, data, navigate } = payload
  const [idb] = store.getEntities((store: any) => store.idb);
  const addAccount = slice.getActions((slice: any) => slice.addAccount);
  const accountId = data.accountId;
  const modifiedAccountId = accountId.replace(/\./g, '-dot-');

  try {
    const account = {
      accountId,
    };
    await idb.add('vault', account);
    addAccount({ accountId });

    navigate(`/vault/${modifiedAccountId}`)
    closeModal(false);
  } catch (e) {
    console.log(e);
  }
});
