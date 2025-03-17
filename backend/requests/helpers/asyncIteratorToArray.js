export const asyncIteratorToArray = async (asyncIterator) => {
  const result = [];
  for await (const item of asyncIterator) {
    result.push(item);
  }
  return result;
};
