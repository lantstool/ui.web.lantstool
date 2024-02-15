export const fetchJson = async (url: string, options = {}) => {
  const response = await fetch(url, options);
  return await response.json();
};