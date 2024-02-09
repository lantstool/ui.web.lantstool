import { action } from '../../../../react-vault';

export const putCall = action(({ slice, payload: call }: any) => {
  slice.records[call.callId] = call;
});
