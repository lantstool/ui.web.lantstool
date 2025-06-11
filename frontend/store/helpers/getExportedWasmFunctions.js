export const getExportedWasmFunctions = async (arrayBuffer) => {
  const module = await WebAssembly.compile(arrayBuffer);
  const exports = WebAssembly.Module.exports(module);
  return exports.filter((exp) => exp.kind === 'function');
};