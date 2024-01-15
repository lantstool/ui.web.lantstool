import { onAddTransaction } from './onAddTransaction.ts';
import { onSendTransaction } from './onSendTransaction/onSendTransaction.ts';
import { onInitPage } from './onInitPage.ts';
import { onSaveTransaction } from './onSaveTransaction.ts';
import { onDeleteTransaction } from './onDeleteTransaction.ts';
import { onEditTransactionName } from './onEditTransactionName.ts';
import { getTransactionCount } from './getTransactionCount.ts';

export const effects = {
  onAddTransaction,
  onSendTransaction,
  onInitPage,
  onSaveTransaction,
  onDeleteTransaction,
  onEditTransactionName,
  getTransactionCount,
};
