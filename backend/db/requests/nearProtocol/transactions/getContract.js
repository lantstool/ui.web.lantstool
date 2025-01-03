export const getContract = async ({ request, storage }) => {
  const { fileName } = request.body;
  // Return contracts WASM as Uint8Array;
  if (storage.nearProtocol.contracts[fileName]) return storage.nearProtocol.contracts[fileName];

  throw new Error(`Contract's WASM '${fileName}' not found`);
};
