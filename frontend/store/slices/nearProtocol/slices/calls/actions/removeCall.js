import { action } from '../../../../../../../react-vault/index.js';

export const removeCall = action(({ slice, payload }) => {
  const { callId, updatedCallsOrder } = payload;
  slice.ids = slice.ids.filter((id) => id !== callId);
  delete slice.records[callId];

  Object.entries(updatedCallsOrder).forEach(([txId, order]) => {
    slice.records[txId].order = order;
  });
});
