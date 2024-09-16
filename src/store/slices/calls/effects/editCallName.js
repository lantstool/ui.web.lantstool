import { effect } from '../../../../react-vault/index.js';

export const editCallName = effect(async ({ payload, slice, store }) => {
  const { callId, callName } = payload;
  const [idb] = store.getEntities((store) => store.idb);
  const updateCall = slice.getActions((slice) => slice.updateCall);
  const oldCall = store.getState((state) => state.calls.records[callId]);

  try {
    const record = await idb.get('calls', callId);
    record.name = callName;

    await idb.put('calls', record);
    updateCall({ ...record, results: oldCall.results });
  } catch (e) {
    console.log(e);
  }
});
