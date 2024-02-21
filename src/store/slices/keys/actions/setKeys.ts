import { action } from '../../../../react-vault';

export const setKeys = action(({ slice, payload: keys }: any) => {
  slice.ids = [];
  slice.records = {};

  keys.forEach((key: any) => {
    slice.ids.push(key.publicKey);
    slice.records[key.publicKey] = key;
  });
});
