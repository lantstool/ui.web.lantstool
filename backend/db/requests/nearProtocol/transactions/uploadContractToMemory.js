import { getHashedWasmName } from './helpers/getHashedWasmName.js';

/**
  * We temporarily save the contract's WASM into the memory until user will save
  * the tx with this file or reload the page and destroy all transactions dependent
  * on this WASM;
  *
  * We do it in case to allow user to navigate thought the app without losing
  * selected file every time he leaves the tx page;
  *
  * We don't remove unused contracts from the memory storage manually in purpose to
  * reduce app logic - we don't expect that it could be a problem -
  * there is a very small chance than the user will upload hundreds of unused contracts
  * and will get a memory leak;
 */

export const uploadContractToMemory = async ({ request, storage }) => {
  const { file } = request.body;
  const fileArrayBuffer = await file.arrayBuffer();
  const hashedName = await getHashedWasmName(file.name, fileArrayBuffer);

  storage.nearProtocol.contracts[hashedName] = new Uint8Array(fileArrayBuffer);

  return hashedName;
};
