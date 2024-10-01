import { actionType } from '../types.js';

export const action = (handler) => ({
  type: actionType,
  handler,
});
