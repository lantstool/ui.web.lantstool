import { effect } from '../../../../react-vault';

export const editCallName = effect(async ({ payload, slice, store }: any) => {
  const {callId, callName } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const updateCall = slice.getActions((slice: any) => slice.updateCall);
  try {
    const record = await idb.get('calls', callId);
    record.name = callName;

    await idb.put('calls', record);
    updateCall(record);
  } catch (e) {
    console.log(e);
  }
});
