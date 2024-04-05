import { action } from '../../../../react-vault';

export const setKeysOnce = action(({ slice, payload: keys }: any) => {
  const ids = [];
  const records: any = {};

  keys.forEach((key: any) => {
    ids.push(key.publicKey);
    records[key.publicKey] = key;
  });

  slice.ids = ids;
  slice.records = records;
});
