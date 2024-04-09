import { action } from '../../../../react-vault';

export const resetState = action(({ slice }: any) => {
  slice.list = [];
  slice.map = {};
  slice.isTransactionsLoadedToState = false;
  slice.temporaryFormValues = {};
});
