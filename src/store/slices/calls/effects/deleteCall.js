import { effect } from '../../../../react-vault';

// We need to update the order of all txs which have order > than the deleted one
// because we need to have a subsequent unique order of txs like 0, 1, 2, 3, 4, 5, not 0, 1, 3, 5
// because we use txs count as a tx order for the new tx
// So if we have 6 txs, and we delete the 3rd one - we need to update the order of the 4th, 5th and 6th txs

const updateCallsOrder = async (idb, txOrder, networkId) => {
  const tx = idb.transaction('calls', 'readwrite');
  const index = tx.store.index('spaceId_networkId_order');

  const updatedCallOrder = {};

  for await (const cursor of index.iterate(
    IDBKeyRange.bound(['space1', networkId, txOrder], ['space1', networkId, Infinity]),
  )) {
    const call = { ...cursor.value, order: cursor.value.order - 1 };
    updatedCallOrder[call.callId] = call.order;
    cursor.update(call);
  }

  await tx.done;

  return updatedCallOrder;
};

// TODO: handle the case when we delete the last tx in the list - we also need
// to clear navigation state for transactions and we shouldn't navigate to last
// deleted tx

const getNextRoute = (ids, activeTxId, networkId) => {
  // If we have only 1 tx in the list after we will have 0 records
  if (ids.length === 1) return `/${networkId}/calls`;
  const index = ids.findIndex((id) => id === activeTxId);
  // If we want to delete the second or further tx - return the upper one
  if (0 < index) return `/${networkId}/calls/${ids[index - 1]}`;
  // If we want to delete is first tx in the list - return the lover one
  if (0 === index) return `/${networkId}/calls/${ids[index + 1]}`;
};

export const deleteCall = effect(async ({ payload, slice, store }) => {
  const { callId, navigate } = payload;
  const [idb] = store.getEntities((store) => store.idb);
  const removeCall = slice.getActions((slice) => slice.removeCall);
  const { order } = slice.getState((slice) => slice.records[callId]);
  const networkId = store.getState((store) => store.networks.current.networkId);

  try {
    const ids = slice.getState((slice) => slice.ids);
    const nextRoute = getNextRoute(ids, callId, networkId);
    //
    await idb.delete('calls', callId);
    const updatedCallsOrder = await updateCallsOrder(idb, order, networkId);
    removeCall({ callId, updatedCallsOrder });
    //
    navigate(nextRoute);
  } catch (e) {
    console.log(e);
  }
});
