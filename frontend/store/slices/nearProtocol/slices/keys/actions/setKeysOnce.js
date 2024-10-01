import { action } from '../../../../../../../react-vault/index.js';

export const setKeysOnce = action(({ slice, payload: keys }) => {
  keys.forEach((key) => {
    slice.ids.push(key.publicKey);
    slice.records[key.publicKey] = key;
  });

  slice.isKeysLoadedToState = true;
});
