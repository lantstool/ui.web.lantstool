import { action } from '@react-vault';

export const updateOne = action(({ slice, payload }) => {
  const { item } = payload;

  slice.records = slice.records.map((record) =>
    record.folderId === item.folderId ? { ...record, collapsed: !item.collapsed } : record,
  );
});
