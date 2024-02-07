import { effect } from '../../../../react-vault';

export const getCalls = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const initPage = slice.getActions((slice: any) => slice.initPage);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const calls = await idb.getAllFromIndex(
      'calls',
      'spaceId_networkId_order',
      IDBKeyRange.bound([spaceId, networkId, 0], [spaceId, networkId, Infinity]),
    );

    payload(false);
    initPage(calls);
  } catch (e) {
    console.log(e);
  }
});
