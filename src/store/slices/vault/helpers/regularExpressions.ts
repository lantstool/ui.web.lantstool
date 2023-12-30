export const replaceDotsToString = (id: string) => {
  return id.replace(/\./g, '-dot-');
};
export const replaceStringToDots = (id: string) => {
  return id.replace(/-dot-/g, '.');
};
export const hideText = (text: string) => {
  return text.replace(/./g, '*');
};