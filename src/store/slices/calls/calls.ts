import { setCalls } from './actions/setCalls.ts';
import { addCall } from './actions/addCall.ts';
import { putCall } from './actions/putCall.ts';
import { updateCall } from './actions/updateCall.ts';
import { putTemporaryFormValues } from './actions/putTemporaryFormValues.ts';
import { updateCallsPosition } from './actions/updateCallsPositon.ts';
import { removeCall } from './actions/removeCall.ts';
import { setOpenResult } from './actions/setOpenResult.ts';
import { addResult } from './actions/addResult.ts';
import { createCall } from './effects/createCall.ts';
import { getOnceCalls } from './effects/getOnceCalls.ts';
import { saveCall } from './effects/saveCall.ts';
import { deleteCall } from './effects/deleteCall.ts';
import { getCallsCount } from './effects/getCallsCount.ts';
import { reorderCalls } from './effects/reorderCalls.ts';
import { getAccountBalance } from './effects/getAccountBalance';
import { onDuplicateTransaction } from './effects/onDuplicateTransaction';
import { callMethod } from './effects/callMethod.ts';
import { loadCall } from './effects/loadCall.ts';
import { revertCall } from './effects/revertCall.ts';
import { editCallName } from './effects/editCallName.ts';

export const calls = {
  // init state
  ids: [],
  records: {},
  temporaryFormValues: {},
  // actions
  setCalls,
  addCall,
  putCall,
  updateCall,
  updateCallsPosition,
  removeCall,
  setOpenResult,
  addResult,
  // effects
  createCall,
  getOnceCalls,
  saveCall,
  deleteCall,
  getCallsCount,
  reorderCalls,
  getAccountBalance,
  onDuplicateTransaction,
  callMethod,
  loadCall,
  putTemporaryFormValues,
  revertCall,
  editCallName,
};
