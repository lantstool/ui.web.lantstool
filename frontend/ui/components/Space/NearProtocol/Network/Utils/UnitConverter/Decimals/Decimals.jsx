import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { onChange } from './onChange.js';

export const Decimals = ({ form }) => {
  return (
    <FormInput
      onChange={onChange(form)}
      control={form.control}
      name="decimals"
      label="Decimals"
      placeholder="24"
    />
  );
};
