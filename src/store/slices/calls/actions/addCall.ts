import { action } from '../../../../react-vault';

export const addCall = action(({ slice, payload: call }: any) => {
  slice.ids.push(call.callId);
  slice.records[call.callId] = call;
});
