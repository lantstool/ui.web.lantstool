import { convertTokensToUnits, convertUnitsToTokens } from '../converters.js';

const setNewValue = (to, value, decimals, setValue) => {
  if (decimals === '') return setValue(to, '');

  try {
    const handler = to === 'units' ? convertTokensToUnits : convertUnitsToTokens;
    setValue(to, handler(value, decimals));
  } catch (e) {
    setValue(to, '');
  }
};

export const updateValues = (decimals, form) => {
  const [lastOnChange, tokens, units] = form.getValues(['lastOnChange', 'tokens', 'units']);
  if (!lastOnChange) return;

  lastOnChange === 'tokens'
    ? setNewValue('units', tokens, decimals, form.setValue)
    : setNewValue('tokens', units, decimals, form.setValue);
};

export const transformValue = (val) => {
  // Remove any non-digit characters
  let value = val.replace(/[^0-9]/g, '');

  let num = parseInt(value, 10);
  // If value is not a number, clear the input
  if (isNaN(num)) return '';
  // Clamp the value to the range [1, 100]
  if (num < 1) num = 1;
  if (num > 100) num = 100;

  return String(num);
};

export const onChange = (form) => (field) => (e) => {
  const value = typeof e === 'string' ? e : e.target.value;
  const transformedValue = transformValue(value);

  field.onChange(transformedValue);
  updateValues(transformedValue, form);
};
