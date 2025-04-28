// Looks like it's a safe limit - we can't calculate the exact gas because
// touchingTrieNode and readCachedTrieNode
const GAS_LIMIT = 75_000_000_000_000;

// TODO Looks like it's not a fully correct function; Need to do a better research
const getDeletePairCost = (pair, protocolConfig) => {
  const { storageRemoveBase, storageRemoveKeyByte, storageRemoveRetValueByte } =
    protocolConfig.runtimeConfig.wasmConfig.extCosts;

  return (
    storageRemoveBase +
    Buffer.byteLength(pair.key, 'base64') * storageRemoveKeyByte +
    Buffer.byteLength(pair.value, 'base64') * storageRemoveRetValueByte
  );
};

/**
 * Splits an array of entries into bins using the First-Fit Decreasing algorithm.
 * First, entries are sorted in descending order by cost, then each entry is placed
 * into the first bin where adding it does not exceed the specified gas limit.
 *
 * @param {Array<{ cost: number, [key: string]: any }>} entries
 *   An array of objects each containing at least a `cost` property (gas cost).
 * @param {number} gasLimit
 *   The maximum allowed total gas cost for each bin.
 * @returns {Array<{ entries: Array, totalCost: number }>}
 *   An array of bins. Each bin is an object with:
 *   - `entries`: the list of entries assigned to that bin,
 *   - `totalCost`: the sum of costs for entries in that bin.
 *
 * @example
 * const tasks = [
 *   { name: 'A', cost: 40 },
 *   { name: 'B', cost: 30 },
 *   { name: 'C', cost: 20 },
 *   { name: 'D', cost: 10 },
 * ];
 * const bins = firstFitDecreasing(tasks, 50);
 * // Output:
 * // [
 * //   { entries: [{ name: 'A', cost: 40 }, { name: 'D', cost: 10 }], totalCost: 50 },
 * //   { entries: [{ name: 'B', cost: 30 }, { name: 'C', cost: 20 }], totalCost: 50 }
 * // ]
 */

const firstFitDecreasing = (entries, gasLimit) => {
  const bins = [];

  const sortedEntries = entries.slice().sort((a, b) => b.cost - a.cost);

  for (const entry of sortedEntries) {
    let placed = false;
    for (const bin of bins) {
      if (bin.totalCost + entry.cost <= gasLimit) {
        bin.entries.push(entry);
        bin.totalCost += entry.cost;
        placed = true;
        break;
      }
    }
    if (!placed) {
      bins.push({ entries: [entry], totalCost: entry.cost });
    }
  }

  return bins;
};

export const splitPageIntoChunks = (page, protocolConfig) => {
  const entries = page.values.map((pair) => ({
    key: pair.key,
    cost: getDeletePairCost(pair, protocolConfig),
  }));

  return firstFitDecreasing(entries, GAS_LIMIT);
};
