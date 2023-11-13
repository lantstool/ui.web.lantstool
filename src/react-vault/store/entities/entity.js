import { entityType } from '../types';

export const entity = (handler) => ({
  type: entityType,
  handler,
});
