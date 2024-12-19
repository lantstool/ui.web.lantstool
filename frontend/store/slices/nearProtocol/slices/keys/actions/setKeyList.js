import { action } from '@react-vault';

export const setKeyList = action(({ slice, payload: keys }) => {
  slice.ids = [];
  slice.records = {};

  keys.forEach((key) => {
    slice.ids.push(key.publicKey);
    slice.records[key.publicKey] = key;
  });
});
