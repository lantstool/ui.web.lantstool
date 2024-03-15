import { action } from '../../../../react-vault';

export const updateCallsPosition = action(({ slice, payload }: any) => {
  const { reorderMap, reorderList } = payload;
  slice.records = reorderMap;
  slice.ids = reorderList;
});
