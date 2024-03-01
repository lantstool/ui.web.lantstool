import { effect } from '../../../../react-vault';

export const loadKeysOnce = effect(async ({ slice, store }: any) => {
  const isContractsLoadedToState = slice.getState((slice: any) => slice.isContractsLoadedToState);
  if (isContractsLoadedToState) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const { networkId, spaceId } = store.getState((slice: any) => slice.networks.current);
  const setKeysOnce = store.getActions((slice: any) => slice.keys.setKeysOnce);

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
