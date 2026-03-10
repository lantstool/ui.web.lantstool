import { action } from '@react-vault';

export const resetState = action(({ slice }) => {
  slice.notification = {};
  slice.migrations = {};
});
