const getData = (actions, selector) => {
  const action = selector(actions);
  if (action === undefined) throw new Error('Invalid effect selector');
  return action;
};

export const createActionSelector = (actions) => (selector) => {
  if (typeof selector !== 'function') throw new Error(`Selector must be a function`);
  return getData(actions, selector);
};
