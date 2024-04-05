import { effect } from '../../../../react-vault';

export const getOnceCalls = effect(async ({ slice, store }: any) => {
  const { ids, records } = slice.getState((slice: any) => slice);
  const { spaceId, networkId } = store.getState((store: any) => store.networks.current);
  const firstObject: any = Object.values(records)[0];

  if (ids.length > 0 && firstObject?.networkId === networkId) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const setCalls = slice.getActions((slice: any) => slice.setCalls);

  try {
    const calls = await idb.getAllFromIndex(
      'calls',
      'spaceId_networkId_order',
      IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
    );
    setCalls(calls);
  } catch (e) {
    console.log(e);
  }
});
