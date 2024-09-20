import { effect } from '../../../../../react-vault/index.js';

const reorder = (list, currentOrder, newOrder) => {
  const keys = Object.keys(list);

  const [removedKey] = keys.splice(currentOrder, 1);

  keys.splice(newOrder, 0, removedKey);

  const reorderList = {};
  keys.forEach((key, index) => {
    const call = { ...list[key] };
    call.order = index;
    reorderList[key] = call;
  });

  return reorderList;
};

export const reorderCalls = effect(async ({ payload, slice, store }) => {
  const { currentOrder, newOrder } = payload;
  const [idb] = store.getEntities((store) => store.idb);
  const updateCallsPosition = slice.getActions((slice) => slice.updateCallsPosition);
  const list = store.getState((store) => store.calls.records);
  const { networkId, spaceId } = store.getState((store) => store.networks.current);

  try {
    const reorderMap = reorder(list, currentOrder, newOrder);
    const reorderList = Object.keys(reorderMap);

    updateCallsPosition({ reorderMap, reorderList });

    const calls = await idb.getAllFromIndex(
      'calls',
      'spaceId_networkId_order',
      IDBKeyRange.bound(['space1', networkId, 0], [spaceId, networkId, Infinity]),
    );

    await Promise.all(
      reorderList.map((id, index) => {
        const callToUpdate = calls.find((el) => el.callId === id);
        if (callToUpdate) {
          callToUpdate.order = index;
          return idb.put('calls', callToUpdate);
        }
      }),
    );
  } catch (e) {
    console.log(e);
  }
});
