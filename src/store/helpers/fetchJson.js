export const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  return await response.json();
};