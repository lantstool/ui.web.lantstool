import { create } from './create.js';
import { getAccountBalance } from './getAccountBalance.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { getTx } from './getTx.js';
import { reorder } from './reorder.js';
import { onDeleteTransaction } from './onDeleteTransaction.js';
import { onDuplicateTransaction } from './onDuplicateTransaction.js';
import { onEditTransactionName } from './onEditTransactionName.js';
import { onSaveTransaction } from './onSaveTransaction.js';
import { onSendTransaction } from './onSendTransaction/onSendTransaction.js';
import { revertTransaction } from './revertTransaction.js';

export const effects = {
  create,
  getCount,
  getList,
  getTx,
  onSendTransaction,
  onSaveTransaction,
  onDeleteTransaction,
  onEditTransactionName,
  reorder,
  getAccountBalance,
  onDuplicateTransaction,
  revertTransaction,
}
