import { effectType } from '../types.js';

export const effect = (handler) => ({
  type: effectType,
  handler,
});
