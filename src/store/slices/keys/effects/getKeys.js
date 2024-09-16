import { effect } from '../../../../react-vault/index.js';

export const getKeys = effect(async ({ store }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const { networkId, spaceId } = store.getState((slice) => slice.networks.current);

  try {
    return await idb.getAllFromIndex(
      'keys',
      'spaceId_networkId_importedAt',
      IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
    );
  } catch (e) {
    console.log(e);
  }
});
