import { action } from '@react-vault';

export const editOne = action(({ slice, payload }) => {
  slice.records[payload.spaceId] = { ...slice.records[payload.spaceId], ...payload };
});
