import { setCalls } from './actions/setCalls.ts';
import { addCall } from './actions/addCall.ts';
import { putCall } from './actions/putCall.ts';
import { createCall } from './effects/createCall.ts';
import { getCalls } from './effects/getCalls.ts';
import { saveCall } from './effects/saveCall.ts';
import { onDeleteTransaction } from './effects/onDeleteTransaction';
import { onEditTransactionName } from './effects/onEditTransactionName';
import { getCallsCount } from './effects/getCallsCount.ts';
import { onReorderTransactions } from './effects/onReorderTransactions';
import { getAccountBalance } from './effects/getAccountBalance';
import { onDuplicateTransaction } from './effects/onDuplicateTransaction';
import { callMethod } from './effects/callMethod.ts';
import { loadCall } from './effects/loadCall.ts';
import { putTemporaryFormValues } from "./actions/putTemporaryFormValues.ts";
import { revertCall } from "./effects/revertCall.ts";

export const calls = {
  // init state
  ids: [],
  records: {},
  temporaryFormValues: {},
  // actions
  setCalls,
  addCall,
  putCall,
  // effects
  createCall,
  getCalls,
  saveCall,
  onDeleteTransaction,
  onEditTransactionName,
  getCallsCount,
  onReorderTransactions,
  getAccountBalance,
  onDuplicateTransaction,
  callMethod,
  loadCall,
  putTemporaryFormValues,
  revertCall,
};
