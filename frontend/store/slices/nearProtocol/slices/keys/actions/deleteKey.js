import { action } from '@react-vault';

export const deleteKey = action(({ slice, payload }) => {
  // slice.ids.push(payload.publicKey);
  // slice.records[payload.publicKey] = payload;

  slice.ids = slice.ids.filter((key) => key !== payload);
  delete slice.records[payload];
});