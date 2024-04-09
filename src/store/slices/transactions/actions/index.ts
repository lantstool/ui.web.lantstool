import { setOnceTransactions } from './setOnceTransactions.ts';
import { addTransaction } from './addTransaction.ts';
import { updateTransaction } from './updateTransaction.ts';
import { deleteTransaction } from './deleteTransaction.ts';
import { reorderTransactions } from './reorderTransactions.ts';
import { duplicateTransaction } from './duplicateTransaction.ts';
import { putTemporaryFormValues } from './putTemporaryFormValues.ts';
import { addResult } from './addResult.ts';
import { setOpenResult } from './setOpenResult.ts';
import { resetState } from './resetState.ts';

export const actions: any = {
  setOnceTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  reorderTransactions,
  duplicateTransaction,
  putTemporaryFormValues,
  addResult,
  setOpenResult,
  resetState,
};
