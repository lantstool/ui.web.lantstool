import { action } from '../../../../../../../react-vault/index.js';

export const addCall = action(({ slice, payload: call }) => {
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  slice.ids.push(call.callId);
  slice.records[call.callId] = { ...call, results };
});
