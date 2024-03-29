import { action } from '../../../../react-vault';

export const duplicateTransaction = action(({ slice, payload: duplicate }: any) => {
  slice.list.splice(duplicate.order, 0, duplicate.transactionId);
  slice.map[duplicate.transactionId] = duplicate;
  slice.list.forEach((transactionId: any, index: number) => {
    const transaction = slice.map[transactionId];
    transaction.order = index;
  });
});
