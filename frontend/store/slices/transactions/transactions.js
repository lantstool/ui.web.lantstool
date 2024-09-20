import { actions } from './actions/index.js';
import { onAddTransaction } from './effects/onAddTransaction.js';
import { onSendTransaction } from './effects/onSendTransaction/onSendTransaction.js';
import { getOnceTransactions } from './effects/getOnceTransactions.js';
import { onSaveTransaction } from './effects/onSaveTransaction.js';
import { onDeleteTransaction } from './effects/onDeleteTransaction.js';
import { onEditTransactionName } from './effects/onEditTransactionName.js';
import { getTransactionCount } from './effects/getTransactionCount.js';
import { onReorderTransactions } from './effects/onReorderTransactions.js';
import { getAccountBalance } from './effects/getAccountBalance.js';
import { onDuplicateTransaction } from './effects/onDuplicateTransaction.js';
import { revertTransaction } from './effects/revertTransaction.js';

export const transactions = {
  // init state
  list: [],
  map: {},
  temporaryFormValues: {},
  isTransactionsLoadedToState: false,
  // actions
  ...actions,
  // effects
  onAddTransaction,
  onSendTransaction,
  getOnceTransactions,
  onSaveTransaction,
  onDeleteTransaction,
  onEditTransactionName,
  getTransactionCount,
  onReorderTransactions,
  getAccountBalance,
  onDuplicateTransaction,
  revertTransaction,
};
