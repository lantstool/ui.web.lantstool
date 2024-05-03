import { setOnceTransactions } from './setOnceTransactions.js';
import { addTransaction } from './addTransaction.js';
import { updateTransaction } from './updateTransaction.js';
import { deleteTransaction } from './deleteTransaction.js';
import { reorderTransactions } from './reorderTransactions.js';
import { duplicateTransaction } from './duplicateTransaction.js';
import { putTemporaryFormValues } from './putTemporaryFormValues.js';
import { addResult } from './addResult.js';
import { setOpenResult } from './setOpenResult.js';
import { resetState } from './resetState.js';

export const actions = {
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
