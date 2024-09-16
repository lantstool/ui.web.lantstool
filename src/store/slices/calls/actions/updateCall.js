import { action } from '../../../../react-vault/index.js';

export const updateCall = action(({ slice, payload }) => {
  slice.records[payload.callId] = payload;
});
