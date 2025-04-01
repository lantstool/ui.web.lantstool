import { effect } from '@react-vault';
import { downloadWasm as downloadWasmFile } from '../../../../../helpers/downloadWasm.js';

export const downloadWasm = effect(({ payload }) => {
  const binary = atob(payload.base64Wasm);
  const buffer = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  // Replace all '.' with '_'
  const name = payload.contractId.replace(/\./g, '_');

  downloadWasmFile(buffer, name);
});
