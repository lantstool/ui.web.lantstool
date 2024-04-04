import { action } from '../../../../react-vault';

export const setCalls = action(({ slice, payload: calls }: any) => {
  const ids = [];
  const records: any = {};
  const results = {
    currentResult: null,
    isOpen: false,
    isLoading: false,
    records: [],
  };

  calls.forEach((call: any) => {
    ids.push(call.callId);
    records[call.callId] = { ...call, results };
  });

  slice.ids = ids;
  slice.records = records;
});
