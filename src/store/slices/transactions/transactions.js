import { actions } from './actions/index.ts';
import { onAddTransaction } from './effects/onAddTransaction';
import { onSendTransaction } from './effects/onSendTransaction/onSendTransaction';
import { onInitPage } from './effects/onInitPage';
import { onSaveTransaction } from './effects/onSaveTransaction';
import { onDeleteTransaction } from './effects/onDeleteTransaction';
import { onEditTransactionName } from './effects/onEditTransactionName';
import { getTransactionCount } from './effects/getTransactionCount';
import { onReorderTransactions } from './effects/onReorderTransactions';
import { getAccountBalance } from './effects/getAccountBalance';

export const transactions = {
  // init state
  list: [],
  map: { a: 1 },

  ...actions,
  // effects
  onAddTransaction,
  onSendTransaction,
  onInitPage,
  onSaveTransaction,
  onDeleteTransaction,
  onEditTransactionName,
  getTransactionCount,
  onReorderTransactions,
  getAccountBalance,
};
