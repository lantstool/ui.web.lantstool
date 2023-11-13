import { effectType } from '../types';

export const effect = (handler) => ({
  type: effectType,
  handler,
});
