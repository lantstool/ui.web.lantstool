import { effect } from '../../../../react-vault';

// We want to fetch data from DB only once - after that we will have all actual data in the state
export const getOnceAccounts = effect(async ({ store, slice }: any) => {
  const ids = slice.getState((slice: any) => slice.ids);
  if (ids.length > 0) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const setAccounts = slice.getActions((slice: any) => slice.setAccounts);
  const { spaceId, networkId } = store.getState((store: any) => store.networks.current);

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
