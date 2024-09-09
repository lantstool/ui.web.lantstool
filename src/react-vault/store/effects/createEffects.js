import { get } from 'lodash';
import { effectType } from '../types';
import { mapModel } from '../utils/mapModel';
import { createEffectSelector } from './createEffectSelector';

const createEffect =
  ({ store, handler, path }) =>
  (payload) =>
    handler({
      payload,
      slice: {
        getState: store.state.useSliceSelector(path),
        getActions: store.actions.useSliceSelector(path),
        getEffects: store.effects.useSliceSelector(path),
        getEntities: store.entities.useSliceSelector(path),
      },
      store: {
        getState: store.state.useSelector,
        getActions: store.actions.useSelector,
        getEffects: store.effects.useSelector,
        getEntities: store.entities.useSelector,
      },
    });

export const createEffects = (store, model) => {
  const effects = mapModel(store, model.effects, createEffect, effectType);
  return {
    getEffects: () => effects,
    useSliceSelector: (path) => createEffectSelector(get(effects, path)),
    useSelector: createEffectSelector(effects),
  };
};
