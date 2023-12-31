import { action } from '../../../../react-vault';

export const updateTransaction = action(({ slice, payload }: any) => {
  slice.map[payload.transactionId] = payload;
});
