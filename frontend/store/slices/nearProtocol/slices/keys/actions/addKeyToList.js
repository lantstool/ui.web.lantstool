import { action } from '../../../../../../../react-vault/index.js';

export const addKeyToList = action(({ slice, payload }) => {
  slice.ids.push(payload.publicKey);
  slice.records[payload.publicKey] = payload;
});
