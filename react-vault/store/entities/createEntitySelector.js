import { entityType } from '../types.js';

const getEntity = (entities, selector) => {
  const entity = selector(entities);
  if (entity?.type !== entityType) throw new Error('Invalid selector');
  return [entity.get(), entity.set, entity.get];
};

export const createEntitySelector = (entities) => (selector) => {
  if (typeof selector === 'function') return getEntity(entities, selector);
  throw new Error(`Selector: '${selector}' must be a function`);
};
