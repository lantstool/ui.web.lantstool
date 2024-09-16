import { effect } from '../../../../react-vault/index.js';

export const loadKeysOnce = effect(async ({ slice, store }) => {
  const isKeysLoadedToState = slice.getState((slice) => slice.isKeysLoadedToState);
  if (isKeysLoadedToState) return;

  const [idb] = store.getEntities((store) => store.idb);
  const { networkId, spaceId } = store.getState((slice) => slice.networks.current);
  const setKeysOnce = store.getActions((slice) => slice.keys.setKeysOnce);

  try {
    const keys = await idb.getAllFromIndex(
      'keys',
      'spaceId_networkId_importedAt',
      IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
    );
    setKeysOnce(keys);
  } catch (e) {
    console.log(e);
  }
});
