import { effect } from '../../../../react-vault/index.js';

export const deleteAccount = effect(async ({ slice, store, payload }) => {
  const { accountId, navigate } = payload;
  const [idb] = store.getEntities((store) => store.idb);
  const spaceId = store.getState((store) => store.networks.current.spaceId);
  const networkId = store.getState((store) => store.networks.current.networkId);
  const removeAccount = slice.getActions((slice) => slice.removeAccount);

  try {
    await idb.delete('accounts', [spaceId, networkId, accountId]);

    removeAccount(accountId);
    navigate(`/${networkId}/accounts`);
  } catch (e) {
    console.log(e);
  }
});
