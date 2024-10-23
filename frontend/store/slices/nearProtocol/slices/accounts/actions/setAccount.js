import { action } from '@react-vault';

export const setAccount = action(({ slice, payload }) => {
  slice.ids.push(payload.accountId);
  slice.records[payload.accountId] = payload;
});
