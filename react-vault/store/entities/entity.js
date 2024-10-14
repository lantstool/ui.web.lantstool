import { entityType } from '../types.js';

export const entity = (handler) => ({
  type: entityType,
  handler,
});
