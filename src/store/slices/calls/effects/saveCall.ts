import { effect } from '../../../../react-vault';

export const saveCall = effect(async ({ payload: newCall, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const putCall = slice.getActions((slice: any) => slice.putCall);
  const oldCall = store.getState((store: any) => store.calls.map[newCall.callId]);

  const call = {
    ...oldCall,
    ...newCall,
  };

  try {
    await idb.put('calls', call);
    putCall(call);
  } catch (e) {
    console.log(e);
  }
});
