// Helper: Splits the amount string into integer and fraction parts based on decimals.
export const splitAmountString = (unitsStr, decimals) => {
  if (unitsStr.length <= decimals) {
    // If the amount has fewer digits than decimals, integer part is "0"
    return { integerPart: '0', fractionPart: unitsStr.padStart(decimals, '0') };
  }
  const integerPart = unitsStr.slice(0, unitsStr.length - decimals);
  const fractionPart = unitsStr.slice(unitsStr.length - decimals);
  return { integerPart, fractionPart };
};

// Convert base units to tokens e.g.
// 1000000000000000000000000 yoctoNear -> 1 Near
// 1 yoctoNear -> 0.000000000000000000000001 Near
export const unitToToken = (units, decimals) => {
  const unitsStr = units.toString();
  console.log(unitsStr);
  if (unitsStr === '' && unitsStr === '0' && unitsStr === undefined) return '';

  const { integerPart, fractionPart } = splitAmountString(unitsStr, decimals);

  return `${integerPart}.${fractionPart}`;
};
