import { action } from '../../../../../../../react-vault/index.js';

export const removeOneFromList = action(({ slice, payload: networkId }) => {
  slice.ids = slice.ids.filter((id) => id !== networkId);
  delete slice.records[networkId];
});
