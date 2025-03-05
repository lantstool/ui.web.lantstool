/**
 * Converts a decimal string value into its base value representation.
 *
 * @param {string} value - The decimal value as a string (e.g., "2.5").
 * @param {number} decimals - The number of decimals to convert to (e.g., 24).
 * @returns {string} - The base value as a string (e.g., "2500000000000000000000000").
 */
export const tokenToUnit = (value, decimals) => {
  // Split the input into integer and fractional parts
  let [integerPart, fractionalPart = ''] = value.split('.');
  // Ensure integerPart is set (e.g., handle inputs like ".5")
  if (!integerPart) {
    integerPart = '0';
  }
  // Truncate the fractional part if it exceeds the specified decimals
  if (fractionalPart.length > decimals) {
    fractionalPart = fractionalPart.slice(0, decimals);
  }
  // Pad the fractional part with zeros to match the required decimals
  const paddedFraction = fractionalPart.padEnd(decimals, '0');
  // Concatenate the integer part with the padded fractional part
  const combined = integerPart + paddedFraction;
  // Convert to BigInt to eliminate any leading zeros and return the string representation
  return BigInt(combined).toString();
};
