import { action } from '../../../../react-vault';

export const duplicateTransaction = action(({ slice, payload }: any) => {
  const { transactions } = payload;

  const reorderedList = transactions.map((el: any) => el.transactionId);
  const reorderedMap = transactions.reduce((acc: any, tx: any) => {
    acc[tx.transactionId] = tx;
    return acc;
  }, {});

  slice.list = reorderedList;
  slice.map = reorderedMap;
});
