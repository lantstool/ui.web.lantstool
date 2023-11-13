import { separateModel } from './utils/separateModel';
import { createState } from './state/createState';
import { createActions } from './actions/createActions';
import { createEffects } from './effects/createEffects';
import { createEntities } from './entities/createEntities';

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
