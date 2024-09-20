import { action } from '../../../../../react-vault/index.js';

export const createKey = action(({ slice, payload }) => {
  slice.ids.push(payload.publicKey);
  slice.records[payload.publicKey] = payload;
});
