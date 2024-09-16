import { action } from '../../../../react-vault/index.js';

export const setCalls = action(({ slice, payload: calls }) => {
  const ids = [];
  const records = {};
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  calls.forEach((call) => {
    ids.push(call.callId);
    records[call.callId] = { ...call, results };
  });

  slice.ids = ids;
  slice.records = records;
  slice.isCallsLoadedToState = true;
});
