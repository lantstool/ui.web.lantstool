import { action } from '../../../../react-vault';

export const reorderTransactions = action(({ slice, payload }) => {
  const { reorderMap,reorderList } = payload;
  slice.map = reorderMap;
  slice.list = reorderList;
});
