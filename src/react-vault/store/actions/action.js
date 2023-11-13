import { actionType } from '../types';

export const action = (handler) => ({
  type: actionType,
  handler,
});
