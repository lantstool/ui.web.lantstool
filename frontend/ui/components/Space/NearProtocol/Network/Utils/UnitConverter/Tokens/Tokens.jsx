import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { convertTokensToUnits } from '../converters.js';

const setUnits = (tokens, form) => {
  if (tokens === '') return form.setValue('units', '');

  try {
    const decimals = form.getValues('decimals');
    const units = convertTokensToUnits(tokens, decimals);
    form.setValue('units', units === 'NaN' ? '' : units);
  } catch (e) {
    form.setValue('units', '');
  }
};

export const Tokens = ({ form }) => {
  const onChange = (field) => (e) => {
    const value = typeof e === 'string' ? e : e.target.value;
    form.setValue('lastOnChange', 'tokens');
    field.onChange(value);
    setUnits(value, form);
  };

  return (
    <FormInput
      onChange={onChange}
      control={form.control}
      name="tokens"
      label="Tokens"
      placeholder="1"
    />
  );
};
