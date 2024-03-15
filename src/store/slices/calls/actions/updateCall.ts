import { action } from '../../../../react-vault';

export const updateCall = action(({ slice, payload }: any) => {
  slice.records[payload.callId] = payload;
});
