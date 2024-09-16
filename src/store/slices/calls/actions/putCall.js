import { action } from '../../../../react-vault/index.js';

export const putCall = action(({ slice, payload: call }) => {
  slice.records[call.callId] = call;
});
