import { produce } from 'immer';
import { get } from 'lodash';
import { createActionSelector } from './createActionSelector.js';
import { actionType } from '../types.js';
import { mapModel } from '../utils/mapModel.js';

const getSlice = (obj, path) => path.reduce((acc, key) => acc[key], obj);

const createAction =
  ({ store, handler, path, key }) =>
  (payload) => {
    const state = produce(store.state.getState(), (draft) => {
      handler({ payload, slice: getSlice(draft, path), store: draft });
    });
    store.state.setState({ nextState: state, payload, path, key });
  };

export const createActions = (store, model) => {
  const actions = mapModel(store, model.actions, createAction, actionType);
  return {
    getActions: () => actions,
    useSliceSelector: (path) => createActionSelector(get(actions, path)),
    useSelector: createActionSelector(actions),
  };
};
