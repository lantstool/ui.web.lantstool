const getData = (effects, selector) => {
  const effect = selector(effects);
  if (typeof effect !== 'function') throw new Error(`Invalid effect selector: ${selector}`);
  return effect;
};

export const createEffectSelector = (effects) => (selector) => {
  if (typeof selector === 'function') {
    return getData(effects, selector);
  }

  throw new Error(`Selector: '${selector}' must be a function`);
};
