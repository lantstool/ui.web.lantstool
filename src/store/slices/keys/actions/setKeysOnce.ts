import { action } from '../../../../react-vault';

export const setKeysOnce = action(({ slice, payload: keys }: any) => {
  keys.forEach((key: any) => {
    slice.ids.push(key.publicKey);
    slice.records[key.publicKey] = key;
  });

  slice.isContractsLoadedToState = true;
});
