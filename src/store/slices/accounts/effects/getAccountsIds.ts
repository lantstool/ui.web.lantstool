import { effect } from '../../../../react-vault';

export const getAccountsIds = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const records = await idb.getAllKeysFromIndex(
      'accounts',
      'spaceId_networkId_importedAt',
      IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
    );
    return records.map(([, , accountId]) => accountId);
  } catch (e) {
    console.log(e);
  }
});
