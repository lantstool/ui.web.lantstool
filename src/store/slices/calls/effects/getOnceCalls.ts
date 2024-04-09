import { effect } from '../../../../react-vault';

export const getOnceCalls = effect(async ({ slice, store }: any) => {
  const isCallsLoadedToState = slice.getState((slice: any) => slice.isCallsLoadedToState);
  if (isCallsLoadedToState) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const setCalls = slice.getActions((slice: any) => slice.setCalls);
  const { spaceId, networkId } = store.getState((store: any) => store.networks.current);

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
