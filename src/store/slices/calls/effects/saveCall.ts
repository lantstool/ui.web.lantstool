import { effect } from '../../../../react-vault';

// TODO reuse this function in Form component
const getFormValues = (call: any, values:any) => ({
  callId: call.callId,
  params: call.params,
  method: call.method,
  type: call.type,
  results: values.results,
});

const getNewCall = (values: any, oldCall: any) => {
  return {
    createdAt: oldCall.createdAt,
    name: oldCall.name,
    networkId: oldCall.networkId,
    order: oldCall.order,
    spaceId: oldCall.spaceId,
    callId: values.callId,
    type: oldCall.type,
    params: values.params,
    method: values.method,
  };
};

export const saveCall = effect(async ({ payload: form, slice, store }: any) => {
  const values = form.getValues();
  const callId = values.callId;
  const [idb] = store.getEntities((store: any) => store.idb);
  const oldCall = slice.getState((slice: any) => slice.records[callId]);
  const putCall = slice.getActions((slice: any) => slice.putCall);
  const putTemporaryFormValues = slice.getActions((slice: any) => slice.putTemporaryFormValues);

  try {
    const call = getNewCall(values, oldCall);
    await idb.put('calls', call);
    putCall({ ...call, results: values.results });
    putTemporaryFormValues({ callId, values: null });
    form.reset(getFormValues(call,values));
  } catch (e) {
    console.log(e);
  }
});
