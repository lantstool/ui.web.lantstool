import { actions } from './actions/index.ts';
import { onAddTransaction } from './effects/onAddTransaction';
import { onSendTransaction } from './effects/onSendTransaction/onSendTransaction';
import { getOnceTransactions } from './effects/getOnceTransactions';
import { onSaveTransaction } from './effects/onSaveTransaction';
import { onDeleteTransaction } from './effects/onDeleteTransaction';
import { onEditTransactionName } from './effects/onEditTransactionName';
import { getTransactionCount } from './effects/getTransactionCount';
import { onReorderTransactions } from './effects/onReorderTransactions';
import { getAccountBalance } from './effects/getAccountBalance';
import { onDuplicateTransaction } from './effects/onDuplicateTransaction';
import { revertTransaction } from './effects/revertTransaction';

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
