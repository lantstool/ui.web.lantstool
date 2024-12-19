import { action } from '@react-vault';

export const resetState = action(({ slice }) => {
  slice.txList = [];
  slice.drafts = {};
  slice.results = {};
});
