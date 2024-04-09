import { action } from '../../../../react-vault';

export const resetState = action(({ slice }: any) => {
  console.log('resetTransactions');
  slice.list = [];
  slice.map = {};
  slice.isTransactionsLoadedToState = false;
  slice.temporaryFormValues = {};
});
