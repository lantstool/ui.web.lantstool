import { action } from '@react-vault';

export const putOneToList = action(({ slice, payload }) => {
  slice.ids.push(payload.spaceId);
  slice.records[payload.spaceId] = payload;
});
