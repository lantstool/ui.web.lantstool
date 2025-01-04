import { opfs } from '../../helpers/opfs.js';

export const getContract = async ({ request, storage }) => {
  const { fileName } = request.body;
  // Return contracts WASM as Uint8Array;
  if (storage.nearProtocol.contracts[fileName]) return storage.nearProtocol.contracts[fileName];

  try {
    return await opfs.getU8File({ path: 'near-protocol/contracts', name: fileName });
  } catch (e) {
    console.log(e);
    throw new Error(`Contract's WASM '${fileName}' not found`);
  }
};
