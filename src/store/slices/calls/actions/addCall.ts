import { action } from '../../../../react-vault';

export const addCall = action(({ slice, payload: call }: any) => {
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  slice.ids.push(call.callId);
  slice.records[call.callId] = { ...call, results };
});
