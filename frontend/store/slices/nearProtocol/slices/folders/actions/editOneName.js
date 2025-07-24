import { action } from '@react-vault';

export const editOneName= action(({ slice, payload }) => {
  const { folderId, name } = payload;

  const folder = slice.records.find((folder) => folder.folderId === folderId);
  folder.name = name;
});
