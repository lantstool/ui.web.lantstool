import { action } from '../../../react-vault/index.ts';

export const updateTransaction = action(({ slice, payload }: any) => {
  slice.map[payload.transactionId] = payload;
});
