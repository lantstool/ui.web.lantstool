import { entityType } from '../types.js';

// const validateMode = (mode) => {
//   if (mode !== 'set' && mode !== 'get') {
//     throw new Error(`You can pass 'get' or 'set' as a second parameter`);
//   }
// };

const getData = (entities, selector) => {
  const data = selector(entities);
  if (data?.type !== entityType) throw new Error('Invalid selector');
  return [data.get(), data.set, data.get];
};

export const createEntitySelector = (entities) => (selector) => {
  // validateMode(mode);
  if (typeof selector !== 'function') throw new Error(`Selector must be a function`);
  return getData(entities, selector);
};
