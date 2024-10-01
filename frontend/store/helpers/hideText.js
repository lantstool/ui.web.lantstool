export const replaceDotsToString = (id) => {
  return id.replace(/\./g, '-dot-');
};
export const replaceStringToDots = (id) => {
  return id.replace(/-dot-/g, '.');
};
export const hideText = (text) => {
  return text.replace(/./g, '*');
};
