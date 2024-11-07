import { action } from '@react-vault';

export const setAll = action(({ slice, payload }) => {
  slice.ids = [];
  slice.records = {};

  payload.forEach((space) => {
    slice.ids.push(space.spaceId);
    slice.records[space.spaceId] = space;
  });
});
