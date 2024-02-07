import { action } from '../../../../react-vault';

export const initPage = action(({ slice, payload: calls }: any) => {
  const list = [];
  const map: any = {};

  calls.forEach((call: any) => {
    list.push(call.callId);
    map[call.callId] = call;
  });

  slice.list = list;
  slice.map = map;
});
