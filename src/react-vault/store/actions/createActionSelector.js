const getData = (actions, selector) => {
  const action = selector(actions);
  if (typeof action !== 'function') throw new Error('Invalid effect selector');
  return action;
};

export const createActionSelector = (actions) => (selector) => {
  if (typeof selector === 'function') {
    return getData(actions, selector);
  }

  throw new Error(`Selector must be a function`);
};
