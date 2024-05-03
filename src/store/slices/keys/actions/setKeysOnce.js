import { action } from '../../../../react-vault';

export const setKeysOnce = action(({ slice, payload: keys }) => {
  keys.forEach((key) => {
    slice.ids.push(key.publicKey);
    slice.records[key.publicKey] = key;
  });

  slice.isKeysLoadedToState = true;
});
