import { separateModel } from './utils/separateModel.js';
import { createState } from './state/createState.js';
import { createActions } from './actions/createActions.js';
import { createEffects } from './effects/createEffects.js';
import { createEntities } from './entities/createEntities.js';

export const createStore = (rawModel) => {
  const model = separateModel(rawModel);

  const store = {
    state: {},
    actions: {},
    effects: {},
    entities: {},
  };

  store.state = createState(model);
  store.actions = createActions(store, model);
  store.effects = createEffects(store, model);
  store.entities = createEntities(store, model);

  return store;
};
