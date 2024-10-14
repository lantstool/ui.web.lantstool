import { action } from '../../../../../../../react-vault/index.js';

export const putOneToList = action(({ slice, payload }) => {
  slice.ids.push(payload.networkId);
  slice.records[payload.networkId] = payload;
});
