import { effect } from '../../../../react-vault';

// TODO reuse this function in Form component
const getFormValues = (call: any) => ({
  callId: call.callId,
  contractId: call.contractId,
  method: call.method,
  arguments: call.arguments,
  signer: call.signer,
});

export const revertCall = effect(({ payload: form, slice }: any) => {
  const values = form.getValues();
  const callId = values.callId;
  const oldCall = slice.getState((slice: any) => slice.records[callId]);
  const putTemporaryFormValues = slice.getActions((slice: any) => slice.putTemporaryFormValues);

  putTemporaryFormValues({ callId, values: null });
  form.reset(getFormValues(oldCall));
});
