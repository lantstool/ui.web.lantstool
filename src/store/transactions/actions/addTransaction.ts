import { action } from '../../../react-vault/index.ts';

export const addTransaction = action(({ slice, payload }: any) => {
  slice.active = payload.transactionId;
  slice.list.push(payload.transactionId);
  slice.map[payload.transactionId] = payload;
});
