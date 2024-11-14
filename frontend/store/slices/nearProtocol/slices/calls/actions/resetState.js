import { action } from '@react-vault';

export const resetState = action(({ slice }) => {
  slice.list = [];
  slice.drafts = {};
  slice.results = {};
});
