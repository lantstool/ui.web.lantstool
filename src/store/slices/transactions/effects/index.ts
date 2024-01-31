import { onAddTransaction } from './onAddTransaction.ts';
import { onSendTransaction } from './onSendTransaction/onSendTransaction.ts';
import { onInitPage } from './onInitPage.ts';
import { onSaveTransaction } from './onSaveTransaction.ts';
import { onDeleteTransaction } from './onDeleteTransaction.ts';
import { onEditTransactionName } from './onEditTransactionName.ts';
import { getTransactionCount } from './getTransactionCount.ts';
import { onReorderTransactions } from './onReorderTransactions.ts';
import { getAccountBalance } from './getAccountBalance.tsx';
import { onDuplicateTransaction } from './onDuplicateTransaction.ts';

export const effects = {
  onAddTransaction,
  onSendTransaction,
  onInitPage,
  onSaveTransaction,
  onDeleteTransaction,
  onEditTransactionName,
  getTransactionCount,
  onReorderTransactions,
  getAccountBalance,
  onDuplicateTransaction,
};
