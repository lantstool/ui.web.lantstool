import { toCamelCase} from "../../../../../../../../store/helpers/toCamelCase.ts";

/**
 * Transforms an array of objects into an object where the keys are the value of `publicKey` property of each object,
 * and the values are the objects themselves.
 *
 * @param {any[]} list - The array of objects to transform.
 * @returns {Object} - The transformed object.
 */
const transformKeys = (list: any[]): object =>
  list.reduce((acc, key) => {
    acc[key.publicKey] = key;
    return acc;
  }, {});

/**
 * Filters an array of chain keys based on the presence of corresponding keys in the imported keys.
 * @param {any[]} chainKeys - The array of chain keys to filter.
 * @param {any[]} importedKeys - The object of imported keys to compare against.
 * @returns {any[]} - The filtered array of chain keys.
 */
const filterKeys = (chainKeys: any[], importedKeys: object): any[] =>
  chainKeys.filter((chainKey: any) => importedKeys[chainKey.publicKey]);

/**
 * Retrieves options for a given account.
 *
 * @param {string} accountId - The account ID.
 * @param {Function} getAccessKeyList - Function that returns the chain access key list for the account.
 * @param {Function} getImportedKeys - Function that returns the imported keys.
 * @param {Function} setOptions - Function to set the options.
 *
 * @returns {Promise<void>} - A promise that resolves when the options are set.
 */
export const getOptions = async (
  accountId: string,
  getAccessKeyList: any,
  getImportedKeys: any,
  setOptions: any,
): Promise<void> => {
  if (!accountId) return;

  const { keys: chainKeys } = await getAccessKeyList(accountId);
  const importedKeys = await getImportedKeys();

  const list = filterKeys(toCamelCase(chainKeys), transformKeys(importedKeys));

  const options = list.map((key: any) => ({
    value: key.publicKey,
    label: key.publicKey,
    permission: key.accessKey.permission,
  }));

  setOptions(options);
};
