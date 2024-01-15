import { action } from '../../../../react-vault';

export const reorderTransactions = action(({ slice, payload }: any) => {
  const { reorderMap,reorderList } = payload;
  slice.map = reorderMap;
  slice.list = reorderList;
});
