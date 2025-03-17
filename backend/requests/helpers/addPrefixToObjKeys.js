/**
 * Generates a new object where each key from the input object is prefixed with the given prefix.
 * We use it to automatically add prefixes to sql params object
 *
 * @param {object} obj - The input object.
 * @param {string} prefix - The prefix to be added to each key (defaults to '@').
 * @returns {object} A new object with updated keys.
 */

export const addPrefixToObjKeys = (obj, prefix = '@') =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[`${prefix}${key}`] = value;
    return acc;
  }, {});
