import { effect } from "../../../../react-vault";

export const getKeys = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const networkId = store.getState((slice: any) => slice.networks.current.networkId);

  try {
    return await idb.getAllFromIndex(
      'keys',
      'spaceId_networkId_importedAt',
      IDBKeyRange.bound(['space1', networkId, -Infinity], ['space1', networkId, Infinity]),
    );
  } catch (e) {
    console.log(e);
  }
});
