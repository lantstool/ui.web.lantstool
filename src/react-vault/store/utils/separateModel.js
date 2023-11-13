import { set } from 'lodash';
import { actionType, effectType, entityType } from '../types';

const setHandlerToCollection = ({ model, key, value: { handler, type }, path, collection }) => {
  set(model[collection], [...path, key], {
    type,
    path,
    handler,
  });
};
// TODO REFACTOR!!!
// Поточно пустий обєкт {} пропадає зі state
const mapValuesToModel = (model, rawModel, path = []) => {
  Object.entries(rawModel).forEach(([key, value]) => {
    const currentPath = [...path, key];

    if (value?.type === actionType) {
      return setHandlerToCollection({ model, key, value, path, collection: 'actions' });
    }

    if (value?.type === effectType) {
      return setHandlerToCollection({ model, key, value, path, collection: 'effects' });
    }

    if (value?.type === entityType) {
      return setHandlerToCollection({ model, key, value, path, collection: 'entities' });
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return mapValuesToModel(model, value, currentPath);
    }

    set(model.initState, currentPath, value);
  });
};

export const separateModel = (rawModel) => {
  const model = {
    initState: {},
    actions: {},
    effects: {},
    entities: {},
  };
  mapValuesToModel(model, rawModel);
  return model;
};
