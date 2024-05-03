import { effect } from '../../../../react-vault';

export const getOnceCalls = effect(async ({ slice, store }) => {
  const isCallsLoadedToState = slice.getState((slice) => slice.isCallsLoadedToState);
  if (isCallsLoadedToState) return;

  const [idb] = store.getEntities((store) => store.idb);
  const setCalls = slice.getActions((slice) => slice.setCalls);
  const { spaceId, networkId } = store.getState((store) => store.networks.current);

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
