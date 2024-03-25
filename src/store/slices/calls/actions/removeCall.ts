import { action } from '../../../../react-vault';

export const removeCall = action(({ slice, payload }: any) => {
  const { callId, updatedCallsOrder } = payload;
  slice.ids = slice.ids.filter((id: string) => id !== callId);
  delete slice.records[callId];

  Object.entries(updatedCallsOrder).forEach(([txId, order]: any) => {
    slice.records[txId].order = order;
  });
});
