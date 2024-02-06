import { action } from '../../../../react-vault';

export const duplicateTransaction = action(({ slice, payload }: any) => {
  const { duplicate, reorderedMap, reorderedList } = payload;

  reorderedList.splice(duplicate.order, 0, duplicate.transactionId);

  slice.list = reorderedList;
  slice.map = { ...reorderedMap, [duplicate.transactionId]: duplicate };
});
