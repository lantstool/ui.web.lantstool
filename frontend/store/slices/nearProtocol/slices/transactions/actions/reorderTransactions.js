import { action } from '../../../../../../../react-vault/index.js';

export const reorderTransactions = action(({ slice, payload }) => {
  const { reorderMap, reorderList } = payload;
  slice.map = reorderMap;
  slice.list = reorderList;
});
