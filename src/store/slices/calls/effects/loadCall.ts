import { effect } from '../../../../react-vault';
/*
   We fetch data from IndexedDB only once when user visit the page for
   the first time. We do it for several reasons:
   1.
 */
export const loadCall = effect(async ({ payload: callId, slice, store }: any) => {
  const records = slice.getState((slice: any) => slice.records);
  if (records[callId]) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const putCall = slice.getActions((slice: any) => slice.putCall);
  // const { spaceId, networkId } = store.getState((store: any) => store.networks.current.spaceId);

  try {
    const call = await idb.get('calls', callId);
    console.log(call);
    putCall(call);
    // payload(false);
    // initPage(calls);
  } catch (e) {
    console.log(e);
  }
});
