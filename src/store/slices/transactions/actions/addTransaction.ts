import { action } from '../../../../react-vault';

export const addTransaction = action(({ slice, payload }: any) => {
  slice.list.push(payload.transactionId);
  slice.map[payload.transactionId] = { ...payload, result: null, isOpen: false };
});
