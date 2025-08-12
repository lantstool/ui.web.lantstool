import { action } from '@react-vault';

export const deleteOne = action(({ slice, payload }) => {
  slice.records = slice.records.filter((folder) => folder.folderId !== payload.folderId);
  delete slice.records[payload.order];
});
