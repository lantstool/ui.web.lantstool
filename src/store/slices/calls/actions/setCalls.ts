import { action } from '../../../../react-vault';

export const setCalls = action(({ slice, payload: calls }: any) => {
  const ids = [];
  const records: any = {};

  calls.forEach((call: any) => {
    ids.push(call.callId);
    records[call.callId] = call;
  });

  slice.ids = ids;
  slice.records = records;
});
