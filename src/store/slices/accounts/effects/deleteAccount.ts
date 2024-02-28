import { effect } from '../../../../react-vault';

export const deleteAccount = effect(async ({ slice, store, payload }: any) => {
  const { accountId, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const removeAccount = slice.getActions((slice: any) => slice.removeAccount);

  try {
    await idb.delete('accounts', [spaceId, networkId, accountId]);

    removeAccount(accountId);
    navigate(`/${networkId}/accounts`);
  } catch (e) {
    console.log(e);
  }
});
