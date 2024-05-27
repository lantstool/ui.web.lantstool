import { effect } from '../../../../react-vault';

// TODO reuse this function in Form component
const getFormValues = (call) => ({
  callId: call.callId,
  method: call.method,
  params: call.params,
  type: call.type,
  results: call.results,
});

export const revertCall = effect(({ payload: form, slice }) => {
  const values = form.getValues();
  const callId = values.callId;
  const oldCall = slice.getState((slice) => slice.records[callId]);
  const putTemporaryFormValues = slice.getActions((slice) => slice.putTemporaryFormValues);

  putTemporaryFormValues({ callId, values: null });
  form.reset(getFormValues(oldCall));
});
