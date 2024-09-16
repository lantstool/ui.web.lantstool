import { effect } from '../../../../react-vault/index.js';

// We want to fetch data from DB only once - after that we will have all actual data in the state
export const getOnceAccounts = effect(async ({ store, slice }) => {
  const isAccountsLoadedToState = slice.getState((slice) => slice.isAccountsLoadedToState);
  if (isAccountsLoadedToState) return;

  const [idb] = store.getEntities((store) => store.idb);
  const setAccounts = slice.getActions((slice) => slice.setAccounts);
  const { spaceId, networkId } = store.getState((store) => store.networks.current);

  try {
    const accounts = await idb.getAllFromIndex(
      'accounts',
      'spaceId_networkId_importedAt',
      IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
    );
    setAccounts(accounts);
  } catch (e) {
    console.log(e);
  }
});
