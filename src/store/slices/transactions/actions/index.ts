import { initPage } from './initPage.ts';
import { addTransaction } from './addTransaction.ts';
import { updateTransaction } from './updateTransaction.ts';
import { deleteTransaction } from './deleteTransaction.ts';
import { reorderTransactions } from './reorderTransactions.ts';

export const actions: any = {
  initPage,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  reorderTransactions,
};
