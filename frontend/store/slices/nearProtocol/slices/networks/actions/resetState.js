import { action } from '@react-vault';

export const resetState = action(({ slice }) => {
  slice.ids = [];
  slice.records = {};
  slice.network = null;
});
