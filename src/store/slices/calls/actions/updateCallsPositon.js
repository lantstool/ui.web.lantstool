import { action } from '../../../../react-vault/index.js';

export const updateCallsPosition = action(({ slice, payload }) => {
  const { reorderMap, reorderList } = payload;
  slice.records = reorderMap;
  slice.ids = reorderList;
});
