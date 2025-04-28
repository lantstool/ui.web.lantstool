import { BigNumber } from 'bignumber.js';

// Configure BigNumber to avoid exponential notation
BigNumber.set({ EXPONENTIAL_AT: 1000, DECIMAL_PLACES: 1000 });

/**
 * Converts units to tokens using a dynamic precision factor.
 * For example, for Near with precision 24, 1 token = 1e24 units.
 *
 * @param {string} units - The amount in units as a string.
 * @param {number} precision - The number of decimal places (from 1 to 100).
 * @returns {string} - The converted amount in tokens as a string.
 */
export const convertUnitsToTokens = (units, precision) => {
  // Calculate conversion factor = 10^precision
  const conversionFactor = new BigNumber(10).pow(precision);
  // Divide units by conversion factor to get tokens
  return new BigNumber(units).dividedBy(conversionFactor).toString();
};

// Example usage:
// For Near, if precision = 24, then 1 token = 1e24 units:
export const convertTokensToUnits = (tokens, precision) => {
  const conversionFactor = new BigNumber(10).pow(precision);
  return new BigNumber(tokens).times(conversionFactor).toString();
};
