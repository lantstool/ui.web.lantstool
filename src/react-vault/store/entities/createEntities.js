import { get } from 'lodash';
import { entityType } from '../types';
import { createEntitySelector } from './createEntitySelector';
import { mapModel } from '../utils/mapModel';

const createEntity = ({ handler, type }) => {
  const state = {
    value: null,
  };
  return {
    type,
    get: () => state.value,
    set: async (payload) => {
      state.value = await handler(payload);
      return state.value;
    },
  };
};

export const createEntities = (store, model) => {
  const entities = mapModel(store, model.entities, createEntity, entityType);
  return {
    getEntities: () => entities,
    useSliceSelector: (path) => createEntitySelector(get(entities, path)),
    useSelector: createEntitySelector(entities),
  };
};

/** selector can be:
 *  (function)
 *  (function, 'set')
 *  ([function], 'set')
 *  ([function, function], 'set')
 */

// const [[entity1, setEntity1], entity2] = store.getEntities([(e) => e.dep.entity1, (e) => e.entity2]);
// const [entity1, entity2] = store.getEntities([e => e.dep.entity1, e => e.entity2]);

// const [entity1, entity2] = store.getEntities([
//   store => store.dep.entity1,
//   store => store.entity2,
// ]);

// const [entity1, setEntity2] = store.getEntities([
//   (state) => state.dep.entity1,
//   [(state) => state.entity2, 'set'],
// ], 'set');
