import { initPage } from './actions/initPage';
import { addCall } from './actions/addCall.ts';
import { updateTransaction } from './actions/updateTransaction';
import { deleteTransaction } from './actions/deleteTransaction';
import { reorderTransactions } from './actions/reorderTransactions';
import { duplicateTransaction } from './actions/duplicateTransaction';
import { createCall } from './effects/createCall.ts';
import { onSendTransaction } from './effects/onSendTransaction/onSendTransaction';
import { getCalls } from './effects/getCalls.ts';
import { onSaveTransaction } from './effects/onSaveTransaction';
import { onDeleteTransaction } from './effects/onDeleteTransaction';
import { onEditTransactionName } from './effects/onEditTransactionName';
import { getCallsCount } from './effects/getCallsCount.ts';
import { onReorderTransactions } from './effects/onReorderTransactions';
import { getAccountBalance } from './effects/getAccountBalance';
import { onDuplicateTransaction } from './effects/onDuplicateTransaction';

export const calls = {
  // init state
  list: [],
  map: { a: 1 }, // TODO need to fix a bug - react-vault remove empty object from model
  // actions
  initPage,
  addCall,
  updateTransaction,
  deleteTransaction,
  reorderTransactions,
  duplicateTransaction,
  // effects
  createCall,
  onSendTransaction,
  getCalls,
  onSaveTransaction,
  onDeleteTransaction,
  onEditTransactionName,
  getCallsCount,
  onReorderTransactions,
  getAccountBalance,
  onDuplicateTransaction,
};
