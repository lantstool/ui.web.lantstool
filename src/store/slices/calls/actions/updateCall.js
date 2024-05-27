import { action } from '../../../../react-vault';

export const updateCall = action(({ slice, payload }) => {
  slice.records[payload.callId] = payload;
});
