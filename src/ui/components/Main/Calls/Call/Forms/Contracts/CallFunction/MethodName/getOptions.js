import { viewCode } from '../../../../../../../../../store/helpers/rpc/viewCode.js';
import { toCamelCase } from '../../../../../../../../../store/helpers/toCamelCase.js';

const base64ToArrayBuffer = (base64String) => {
  const binaryString = window.atob(base64String);
  const bytes = Uint8Array.from({ length: binaryString.length }, (_, i) =>
    binaryString.charCodeAt(i),
  );
  return bytes.buffer;
};

const getExportedWasmFunctions = async (arrayBuffer) => {
  const module = await WebAssembly.compile(arrayBuffer);
  const exports = WebAssembly.Module.exports(module);
  return exports.filter((exp) => exp.kind === 'function');
};

export const getOptions = async (contractId, rpc, setOptions) => {
  console.log('getOptions', contractId);
  if (!contractId) return;

  try {
    const result = await viewCode(contractId, rpc);
    const codeBase64 = toCamelCase(result).result.codeBase64;

    const arrayBuffer = base64ToArrayBuffer(codeBase64);
    const exportedFunctions = await getExportedWasmFunctions(arrayBuffer);

    const options = exportedFunctions.map((fn) => ({
      value: fn.name,
      label: fn.name,
    }));
    console.log('setOptions', options);
    setOptions(options);
  } catch (e) {
    console.log(e);
    setOptions([]);
  }
};
