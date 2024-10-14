import { setCalls } from './actions/setCalls.js';
import { addCall } from './actions/addCall.js';
import { putCall } from './actions/putCall.js';
import { updateCall } from './actions/updateCall.js';
import { putTemporaryFormValues } from './actions/putTemporaryFormValues.js';
import { updateCallsPosition } from './actions/updateCallsPositon.js';
import { removeCall } from './actions/removeCall.js';
import { setOpenResult } from './actions/setOpenResult.js';
import { addResult } from './actions/addResult.js';
import { resetState } from './actions/resetState.js';
import { createCall } from './effects/createCall.js';
import { getOnceCalls } from './effects/getOnceCalls.js';
import { saveCall } from './effects/saveCall.js';
import { deleteCall } from './effects/deleteCall.js';
import { getCallsCount } from './effects/getCallsCount.js';
import { reorderCalls } from './effects/reorderCalls.js';
import { callMethod } from './effects/callMethod.js';
import { revertCall } from './effects/revertCall.js';
import { editCallName } from './effects/editCallName.js';
import { callViewMethod } from './effects/callViewMethod.js';

export const calls = {
  // utils state
  ids: [],
  records: {},
  temporaryFormValues: {},
  isCallsLoadedToState: false,
  // actions
  setCalls,
  addCall,
  putCall,
  updateCall,
  updateCallsPosition,
  removeCall,
  setOpenResult,
  addResult,
  resetState,
  // effects
  createCall,
  getOnceCalls,
  saveCall,
  deleteCall,
  getCallsCount,
  reorderCalls,
  callMethod,
  putTemporaryFormValues,
  revertCall,
  editCallName,
  callViewMethod,
};
