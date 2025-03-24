/**
 * Transforms an object with unpacked files into the following structure:
 * {
 *   backup: { name: string, u8File: Uint8Array },
 *   nearProtocol: {
 *     contracts: Array<{ name: string, u8File: Uint8Array }>
 *   }
 * }
 *
 * - The database file is identified by the pattern:
 *     "lantstool-backup....sqlite"
 * - Files from the "near-protocol/contracts/" folder are added to the "nearProtocol.contracts" array.
 * - If the "near-protocol/contracts/" folder does not exist, contracts will be an empty array.
 */
export const transformUnzippedFiles = (unzipped) => {
  // Initial state of the accumulator: backup = null, and nearProtocol.contracts = []
  return Object.entries(unzipped).reduce(
    (acc, [path, u8File]) => {
      // 1. If it's a database file (starts with 'lantstool-backup' and ends with '.sqlite')
      if (path.startsWith('lantstool-backup') && path.endsWith('.sqlite')) {
        acc.backup = { name: path, u8File };
        return acc;
      }
      // 2. If it's a file from the 'near-protocol/contracts/...'
      if (path.startsWith('near-protocol/contracts/')) {
        // Extract the file name without "near-protocol/contracts/" (e.g., 'test_contract-XYZ.wasm')
        const fileName = path.replace('near-protocol/contracts/', '');
        acc.nearProtocol.contracts.push({ name: fileName, u8File });
        return acc;
      }
      // 3. If none of the conditions matched, return the accumulator unchanged
      return acc;
    },
    {
      backup: null,
      nearProtocol: {
        contracts: [],
      },
    },
  );
};
