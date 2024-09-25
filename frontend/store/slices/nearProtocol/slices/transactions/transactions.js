import { actions } from './actions/index.js';
import { create } from './effects/create.js';
import { getCount } from './effects/getCount.js';
import { getAllForList } from './effects/getAllForList.js';
import { onSendTransaction } from './effects/onSendTransaction/onSendTransaction.js';
import { onSaveTransaction } from './effects/onSaveTransaction.js';
import { onDeleteTransaction } from './effects/onDeleteTransaction.js';
import { onEditTransactionName } from './effects/onEditTransactionName.js';
import { onReorderTransactions } from './effects/onReorderTransactions.js';
import { getAccountBalance } from './effects/getAccountBalance.js';
import { onDuplicateTransaction } from './effects/onDuplicateTransaction.js';
import { revertTransaction } from './effects/revertTransaction.js';

export const transactions = {
  // state
  list: [],
  map: {},
  temporaryFormValues: {},
  // actions
  ...actions,
  // effects
  create,
  getCount,
  getAllForList,
  onSendTransaction,
  onSaveTransaction,
  onDeleteTransaction,
  onEditTransactionName,
  onReorderTransactions,
  getAccountBalance,
  onDuplicateTransaction,
  revertTransaction,
};
