import { action } from '@react-vault';

export const resetState = action(({ slice }) => {
  slice.txList = [];
  slice.txMap = {};
  slice.transaction = null;
  slice.drafts = {};
  slice.results = {};
});
