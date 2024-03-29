import { initPage } from './initPage.ts';
import { addTransaction } from './addTransaction.ts';
import { updateTransaction } from './updateTransaction.ts';
import { deleteTransaction } from './deleteTransaction.ts';
import { reorderTransactions } from './reorderTransactions.ts';
import { duplicateTransaction } from './duplicateTransaction.ts';
import { putTemporaryFormValues } from './putTemporaryFormValues.ts';
import { addResult } from './addResult.ts';
import { setOpenResult } from './setOpenResult.ts';

export const actions: any = {
  initPage,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  reorderTransactions,
  duplicateTransaction,
  putTemporaryFormValues,
  addResult,
  setOpenResult,
};
