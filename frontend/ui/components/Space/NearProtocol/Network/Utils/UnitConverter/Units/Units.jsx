import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { convertUnitsToTokens } from '../converters.js';

const setTokens = (units, form) => {
  if (units === '') return form.setValue('tokens', '');

  try {
    const decimals = form.getValues('decimals');
    const tokens = convertUnitsToTokens(units, decimals);
    form.setValue('tokens', tokens === 'NaN' ? '' : tokens);
  } catch (e) {
    form.setValue('tokens', '');
  }
};

export const Units = ({ form }) => {
  const onChange = (field) => (e) => {
    const value = typeof e === 'string' ? e : e.target.value;
    form.setValue('lastOnChange', 'units');
    field.onChange(value);
    setTokens(value, form);
  };

  return (
    <FormInput
      onChange={onChange}
      control={form.control}
      name="units"
      label="Units"
      placeholder="100000000000000000000000"
    />
  );
};
