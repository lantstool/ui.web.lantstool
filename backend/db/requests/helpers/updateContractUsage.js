import { opfs } from './opfs.js';
import { getTx } from '../nearProtocol/transactions/getTx.js';
import { contractWasmUsageCount } from './contractWasmUsageCount.js';

/**
 * We have to manage the tx WASM files when user save the transaction;
 * We can have the next cases:
 * - User adds the Deploy Contract action for the first time - we want to save it
 *  in OPFS and write the record with usageCounter = 1;
 *  - User add another tx with the same WASM - increase the counter by 1 - usageCounter = 2;
 *  - User has saved tx with a one [Deploy Contract action / WASM A]. He deletes
 *  this action and add 2 similar actions (abstract case) which has different indexes -
 *  increase the counter by 1 (-1 usage + 2 usages) - usageCounter = 3;
 *  - User delete the tx from example above - decrease the counter by 2 - usageCounter = 1;
 *  - User delete last action with this WASM - remove it from OPFS + remove record;
 *
 *  Steps:
 *  - Get list of WASM files in the tx and compare with the saved version, calculate
 *  the difference - output will look like:
 *  [{ 'contract_a': 1 }, { 'contract_b': -1 }]
 *  - Check if contract_a already exists in the OPFS;
 *  If yes - update the counter;
 *  If not - create a file and add the record;
 *  - Update contract_b counter;
 *  If the counter after update = 0 then remove the file and the record;
 */

/**
 * Filter all non-deploy and deploy with empty file actions and return filenames
 */
const getWasmList = (actions) =>
  actions
    .filter((action) => action.type === 'DeployContract' && action?.fileName)
    .map((action) => action.fileName);

/**
 * Returns an object that maps each file name to its frequency in the array.
 * The key is the file name, and the value is how many times it appears.
 */
const countOccurrences = (arr) =>
  arr.reduce(
    (acc, file) => ({
      ...acc,
      [file]: (acc[file] || 0) + 1,
    }),
    {},
  );

/**
 * Compares the file usage counts between two arrays.
 * Returns an object where each key is the file name and its value is the difference in usage:
 *  - A positive number means the file appears more times in the new array.
 *  - A negative number means it appears fewer times.
 *  - If the difference is zero, the file is not included in the result.
 *
 *  Examples:
 *  - [a] -> [a, a, b] = { a: 1, b: 1 }
 *  - [c, b] -> [b, c, b] = { b: 1 }
 *  - [a, a, b] -> [b] = { a: -2 }
 *  - [a, b] -> [] = { a: -1, b: -1 }
 *  - [] -> [a, b, c, d] = { a: 1, b: 1, c: 1, d: 1 }
 *
 */
const getFileUsageDiff = (oldActions, newActions) => {
  const oldCount = countOccurrences(getWasmList(oldActions));
  const newCount = countOccurrences(getWasmList(newActions));
  // Gather all unique file names from both arrays
  const allFiles = new Set([...Object.keys(oldCount), ...Object.keys(newCount)]);
  // Calculate the difference
  return [...allFiles].reduce((acc, file) => {
    const diff = (newCount[file] || 0) - (oldCount[file] || 0);
    return diff !== 0 ? { ...acc, [file]: diff } : acc;
  }, {});
};

export const increaseContractUsage = async ({ execute, storage, u8File, fileName, counter }) => {
  const currentCount = await contractWasmUsageCount.get({ execute, fileName });
  // If file already used in the app - just update the usage counter
  if (Number(currentCount)) {
    await contractWasmUsageCount.update({
      execute,
      fileName,
      usageCount: currentCount + counter,
    });
    return;
  }
  // if the WASM is saving for the first time - copy it from memory or u8File to OPFS
  await opfs.createFileFromU8Buffer({
    buffer: u8File || storage.nearProtocol.contracts[fileName],
    path: 'near-protocol/contracts',
    name: fileName,
  });
  await contractWasmUsageCount.create({ execute, fileName, usageCount: counter });
};

const decreaseContractUsage = async (execute, fileName, counter) => {
  const currentCount = await contractWasmUsageCount.get({ execute, fileName });
  const nextCount = currentCount + counter; // counter is a negative number here
  // If after update there are still some txs which uses the WASM
  // - just update the counter;
  if (nextCount > 0) {
    await contractWasmUsageCount.update({
      execute,
      fileName,
      usageCount: nextCount,
    });
    return;
  }
  // If there are no more usages on the wasm - remove it from OPFS and DB;
  await opfs.removeEntry({ path: 'near-protocol/contracts', name: fileName });
  await contractWasmUsageCount.remove({ execute, fileName });
};

export const updateContractUsage = async ({ execute, storage, transactionId, body }) => {
  const savedTx = await getTx({ execute, request: { body: transactionId } });
  const diffMap = getFileUsageDiff(savedTx.body.actions, body.actions);
  // Iterate over all differences and increase counter and create a contract file
  // if needed or decrease counter and remove a contract file if needed
  await Promise.all(
    Object.entries(diffMap).map(([fileName, counter]) =>
      counter > 0
        ? increaseContractUsage({ execute, storage, fileName, counter })
        : decreaseContractUsage(execute, fileName, counter),
    ),
  );
};
