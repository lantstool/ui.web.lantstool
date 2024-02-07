import { action } from '../../../../react-vault';

export const addCall = action(({ slice, payload: call }: any) => {
  slice.list.push(call.callId);
  slice.map[call.callId] = call;
});
