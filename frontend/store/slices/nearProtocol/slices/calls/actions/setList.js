import { action } from '../../../../../../../react-vault/index.js';

export const setList = action(({ slice, payload: list }) => {
  slice.list = list;
});
