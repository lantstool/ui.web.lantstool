import { action } from '../../../../react-vault';

export const putCall = action(({ slice, payload: call }) => {
  slice.records[call.callId] = call;
});
