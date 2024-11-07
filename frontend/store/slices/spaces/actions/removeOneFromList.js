import { action } from '@react-vault';

export const removeOneFromList = action(({ slice, payload: spaceId }) => {
  slice.ids = slice.ids.filter((id) => id !== spaceId);
  delete slice.records[spaceId];
});
