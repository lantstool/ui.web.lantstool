import { effect } from '../../../../../../../react-vault/index.js';

export const getAccountsIds = effect(async ({ store }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const spaceId = store.getState((store) => store.networks.current.spaceId);
  const networkId = store.getState((store) => store.networks.current.networkId);

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
