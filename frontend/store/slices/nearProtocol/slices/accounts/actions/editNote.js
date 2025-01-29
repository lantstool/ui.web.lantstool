import { action } from '@react-vault';

export const editNote = action(({ slice, payload }) => {
  const { accountId, note } = payload;
  slice.account.details.note = note;
  slice.records[accountId].note = note;
});
