export const mapModel = (store, model, creator, type) =>
  Object.entries(model).reduce((acc, [key, value]) => {
    if (value.type === type) {
      const { path, handler } = value;
      acc[key] = creator({ store, handler, path, type, key });
    } else {
      acc[key] = mapModel(store, value, creator, type);
    }
    return acc;
  }, {});
