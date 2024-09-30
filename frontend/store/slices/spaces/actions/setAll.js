import { action } from '../../../../../react-vault/index.js';

export const setAll = action(({ slice, payload }) => {
  slice.list = payload; // TODO Remove

  slice.ids = [];
  slice.records = {};

  payload.forEach((space) => {
    slice.ids.push(space.spaceId);
    slice.records[space.spaceId] = space;
  });
});
