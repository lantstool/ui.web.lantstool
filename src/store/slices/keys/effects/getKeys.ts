import { effect } from '../../../../react-vault';

export const getKeys = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const { networkId, spaceId } = store.getState((slice: any) => slice.networks.current);
  const setKeys = store.getActions((slice: any) => slice.keys.setKeys);

  try {
    const keys = await idb.getAllFromIndex(
      'keys',
      'spaceId_networkId_importedAt',
      IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
    );
    setKeys(keys);
  } catch (e) {
    console.log(e);
  }
});
