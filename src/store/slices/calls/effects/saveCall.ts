import { effect } from '../../../../react-vault';

// TODO reuse this function in Form component
const getFormValues = (call: any) => ({
  callId: call.callId,
  contractId: call.contractId,
  method: call.method,
  arguments: call.arguments,
  signer: call.signer,
});

export const saveCall = effect(async ({ payload: form, slice, store }: any) => {
  const values = form.getValues();
  const callId = values.callId;
  const [idb] = store.getEntities((store: any) => store.idb);
  const oldCall = slice.getState((slice: any) => slice.records[callId]);
  const putCall = slice.getActions((slice: any) => slice.putCall);
  const putTemporaryFormValues = slice.getActions((slice: any) => slice.putTemporaryFormValues);

  const call = {
    ...oldCall,
    ...values,
    result: null, // We don't want to save a call execution result data in DB
  };

  try {
    await idb.put('calls', call);
    putCall(call);
    putTemporaryFormValues({ callId, values: null });
    form.reset(getFormValues(call))
  } catch (e) {
    console.log(e);
  }
});
